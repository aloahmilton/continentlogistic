import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileText, 
  Download, 
  Eye, 
  Mail, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Settings as SettingsIcon,
  Image as ImageIcon,
  CheckCircle,
  XCircle
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { invoiceApi, userApi, shipmentApi } from "@/lib/api";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function AdminInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [allShipments, setAllShipments] = useState<any[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [paymentInstructions, setPaymentInstructions] = useState("Please make payment via Bank Transfer:\nBank: International Logistics Bank\nAccount: 0099887766\nSwift: ILBGB2L\n\nAfter payment, please upload a screenshot of your receipt in the dashboard.");

  const [viewingProof, setViewingProof] = useState<string | null>(null);
  const [viewingInvoiceId, setViewingInvoiceId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    trackingNumber: "",
    customerName: "",
    customerEmail: "",
    amount: "",
    tax: "0.00"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [invRes, userRes, shipRes] = await Promise.all([
        invoiceApi.getAll(),
        userApi.getAll(),
        shipmentApi.getAll()
      ]);
      setInvoices(invRes.data);
      setCustomers(userRes.data.filter((u: any) => u.role === 'user'));
      setAllShipments(shipRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data from database");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c._id === customerId);
    if (customer) {
      setNewInvoice({
        ...newInvoice,
        customerName: customer.name,
        customerEmail: customer.email,
        trackingNumber: "" // Reset tracking number when customer changes
      });
      
      // Filter shipments for this customer
      const shipments = allShipments.filter(s => 
        (s.receiver && s.receiver.email === customer.email) ||
        (s.sender && s.sender.email === customer.email)
      );
      setFilteredShipments(shipments);
    }
  };

  const handleAddInvoice = async () => {
    try {
      if (!newInvoice.customerName || !newInvoice.amount) {
        toast.error("Please fill in all required fields");
        return;
      }

      const id = `INV-00${invoices.length + 1}`;
      const total = (parseFloat(newInvoice.amount) + parseFloat(newInvoice.tax)).toFixed(2);
      
      const response = await invoiceApi.create({ 
        invoiceNumber: id,
        trackingNumber: newInvoice.trackingNumber, 
        customerName: newInvoice.customerName, 
        customerEmail: newInvoice.customerEmail,
        amount: parseFloat(newInvoice.amount), 
        tax: newInvoice.tax,
        total: parseFloat(total),
        status: 'pending'
      });
      
      setInvoices(prev => [response.data, ...prev]);
      toast.success("Invoice generated and email sent to customer!");
      setIsAddModalOpen(false);
      setNewInvoice({ trackingNumber: "", customerName: "", customerEmail: "", amount: "", tax: "0.00" });
    } catch (error) {
      toast.error("Failed to generate invoice in database");
    }
  };

  const handlePaymentAction = async (status: 'paid' | 'overdue' | 'pending') => {
    if (!viewingInvoiceId) return;
    try {
      await invoiceApi.update(viewingInvoiceId, { status });
      setInvoices(prev => prev.map(inv => inv._id === viewingInvoiceId ? { ...inv, status } : inv));
      toast.success(`Invoice payment ${status === 'paid' ? 'approved' : 'rejected'}`);
      setViewingProof(null);
      setViewingInvoiceId(null);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await invoiceApi.delete(id);
      setInvoices(prev => prev.filter(inv => inv._id !== id));
      toast.success("Invoice deleted from database");
    } catch (error) {
      toast.error("Failed to delete invoice");
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    (inv._id && inv._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.trackingNumber && inv.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.customerName && inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <AdminLayout title="Financials & Invoices">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 max-w-md w-full">
          <Input 
            placeholder="Search invoice #, tracking, or customer..." 
            className="h-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
            <SettingsIcon className="w-4 h-4 mr-2" /> Payment Settings
          </Button>
          <Button className="brand-red-bg hover:bg-red-700" onClick={() => setIsAddModalOpen(true)}>
            <FileText className="w-4 h-4 mr-2" /> New Invoice
          </Button>
        </div>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate New Invoice</DialogTitle>
            <DialogDescription>
              Create a manual invoice for a shipment or service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Select Customer</label>
              <Select onValueChange={handleCustomerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(c => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.name} ({c.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Tracking Number</label>
              <Select 
                disabled={!newInvoice.customerName} 
                onValueChange={(val) => setNewInvoice({...newInvoice, trackingNumber: val})}
                value={newInvoice.trackingNumber}
              >
                <SelectTrigger>
                  <SelectValue placeholder={newInvoice.customerName ? "Select tracking number" : "Choose customer first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map(s => (
                      <SelectItem key={s._id} value={s.trackingNumber}>
                        {s.trackingNumber} - {s.origin} to {s.destination}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="MANUAL" disabled>No shipments found</SelectItem>
                  )}
                  <SelectItem value="MANUAL-ENTRY">-- Manual Entry --</SelectItem>
                </SelectContent>
              </Select>
              {newInvoice.trackingNumber === "MANUAL-ENTRY" && (
                <Input 
                  className="mt-2"
                  placeholder="Enter custom tracking number" 
                  onChange={e => setNewInvoice({...newInvoice, trackingNumber: e.target.value})}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Base Amount ($)</label>
                <Input type="number" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Tax ($)</label>
                <Input type="number" value={newInvoice.tax} onChange={e => setNewInvoice({...newInvoice, tax: e.target.value})} placeholder="0.00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddInvoice} className="brand-red-bg font-bold">Generate & Dispatch Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Total Revenue</p>
          <p className="text-3xl font-black font-serif">$42,850.00</p>
          <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-tighter">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Pending Collections</p>
          <p className="text-3xl font-black font-serif">$8,400.00</p>
          <p className="text-[10px] text-yellow-600 font-bold mt-2 uppercase tracking-tighter">15 invoices pending</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">Overdue Amount</p>
          <p className="text-3xl font-black font-serif text-destructive">$3,200.00</p>
          <p className="text-[10px] text-destructive font-bold mt-2 uppercase tracking-tighter">Action required</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Invoice Info</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Customer</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Amount</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Date Issued</TableHead>
              <TableHead className="text-right font-bold text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice._id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-tight">{invoice._id}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">Shipment: {invoice.trackingNumber}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {invoice.customerName}
                  </TableCell>
                  <TableCell className="font-black text-sm">
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize text-[9px] font-black tracking-widest px-2 ${
                        invoice.status === 'paid' ? 'border-green-500 text-green-600 bg-green-50' : 
                        invoice.status === 'pending' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 
                        'border-red-500 text-red-600 bg-red-50'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {invoice.status === 'paid' ? <CheckCircle2 className="w-2 h-2" /> : 
                         invoice.status === 'pending' ? <Clock className="w-2 h-2" /> : 
                         <AlertCircle className="w-2 h-2" />}
                        {invoice.status}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(invoice.createdAt || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" title="View Proof" disabled={!invoice.proofImage} onClick={() => {
                      setViewingProof(invoice.proofImage);
                      setViewingInvoiceId(invoice._id);
                    }}>
                      <ImageIcon className={`w-4 h-4 ${invoice.proofImage ? 'text-primary' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No invoices found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Payment Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Instructions</DialogTitle>
            <DialogDescription>
              Set the manual payment instructions that users will see on their dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea 
              className="w-full min-h-[150px] p-3 rounded-md border text-sm font-mono"
              value={paymentInstructions}
              onChange={e => setPaymentInstructions(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Payment instructions updated");
              setIsSettingsOpen(false);
            }} className="brand-red-bg">Save Instructions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Proof Modal */}
      <Dialog open={!!viewingProof} onOpenChange={() => setViewingProof(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Verification</DialogTitle>
            <DialogDescription>
              Review the screenshot uploaded by the customer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center bg-muted rounded-lg overflow-hidden border">
            {viewingProof && <img src={viewingProof} alt="Payment Proof" className="max-w-full h-auto max-h-[400px]" />}
          </div>
          <DialogFooter className="flex justify-between sm:justify-between items-center w-full">
            <Button variant="outline" onClick={() => setViewingProof(null)}>Close</Button>
            <div className="flex gap-2">
              <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10" onClick={() => handlePaymentAction('overdue')}>
                <XCircle className="w-4 h-4 mr-2" /> Reject
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handlePaymentAction('paid')}>
                <CheckCircle className="w-4 h-4 mr-2" /> Approve Payment
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
