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
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Building2, 
  User as UserIcon,
  ShieldCheck,
  ShieldAlert,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { userApi } from "@/lib/api";



export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const adminRole = localStorage.getItem("admin_role");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    accountType: "individual",
    companyName: "",
    industry: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await userApi.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers from database");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await userApi.update(id, { status: newStatus });
      setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
      toast.success(`Customer status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userApi.delete(id);
      setCustomers(prev => prev.filter(c => c._id !== id));
      toast.success("Customer record deleted");
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const filteredCustomers = customers.filter(c => 
    (c.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCustomer = async () => {
    try {
      const response = await userApi.create({ 
        ...newCustomer, 
        password: "DefaultPassword123!", // Initial password for new accounts
        role: 'user' 
      });
      setCustomers(prev => [response.data, ...prev]);
      toast.success("Customer added to database");
      setIsAddModalOpen(false);
      setNewCustomer({ name: "", email: "", phone: "", accountType: "individual", companyName: "", industry: "" });
    } catch (error) {
      toast.error("Failed to save customer to database");
    }
  };

  return (
    <AdminLayout title="Customers & Accounts">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 max-w-md w-full">
          <Input 
            placeholder="Search name, email, or company..." 
            className="h-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button className="brand-red-bg hover:bg-red-700" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a new client account for the tracking portal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cust-name">Full Name</Label>
                <Input id="cust-name" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} placeholder="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cust-email">Email Address</Label>
                <Input id="cust-email" type="email" value={newCustomer.email} onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} placeholder="alex@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cust-phone">Phone Number</Label>
                <Input id="cust-phone" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} placeholder="+1..." />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <Select value={newCustomer.accountType} onValueChange={v => setNewCustomer({...newCustomer, accountType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company / Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {newCustomer.accountType === 'company' && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="comp-name">Company Name</Label>
                  <Input id="comp-name" value={newCustomer.companyName} onChange={e => setNewCustomer({...newCustomer, companyName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comp-ind">Industry</Label>
                  <Input id="comp-ind" value={newCustomer.industry} onChange={e => setNewCustomer({...newCustomer, industry: e.target.value})} />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer} className="brand-red-bg">Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Details</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Joined</TableHead>
              <TableHead className="text-right font-bold tracking-widest text-[10px] uppercase">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer._id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${customer.accountType === 'company' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {customer.accountType === 'company' ? <Building2 className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5" /> {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.accountType === 'company' ? 'default' : 'secondary'} className="capitalize text-[10px] font-bold">
                      {customer.accountType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {customer.accountType === 'company' ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{customer.companyName}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{customer.industry}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize text-[10px] font-bold ${
                        customer.status === 'active' ? 'border-green-500 text-green-600 bg-green-50' : 
                        customer.status === 'pending' ? 'border-yellow-500 text-yellow-600 bg-yellow-50' : 
                        'border-red-500 text-red-600 bg-red-50'
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(customer.createdAt || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Manage Account</DropdownMenuLabel>
                        <DropdownMenuItem>View Dashboard</DropdownMenuItem>
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {customer.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(customer._id, 'suspended')} className="text-destructive">
                            <ShieldAlert className="w-4 h-4 mr-2" /> Suspend Account
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(customer._id, 'active')} className="text-green-600">
                            <ShieldCheck className="w-4 h-4 mr-2" /> Activate Account
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {adminRole === 'super' && (
                          <DropdownMenuItem onClick={() => handleDelete(customer._id)} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No customers found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
