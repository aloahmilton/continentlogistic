import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, MessageSquare, MapPin as MapPinIcon, FileText } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { shipmentApi } from "@/lib/api";
import { toast } from "sonner";

export default function AdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newShipment, setNewShipment] = useState({
    trackingNumber: `CT${Math.floor(10000000 + Math.random() * 90000000)}`.toUpperCase(),
    sender: { name: "", email: "", phone: "" },
    receiver: { name: "", email: "", phone: "" },
    origin: "",
    destination: "",
    status: "pending",
    serviceType: "Express",
    weight: "",
    dimensions: "",
    productDetails: "",
    coordinates: { lat: 0, lng: 0 }
  });
  const [isCommunicateOpen, setIsCommunicateOpen] = useState(false);
  const [communication, setCommunication] = useState({
    to: "",
    subject: "Update regarding your shipment",
    message: ""
  });
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    status: "in_transit",
    location: "",
    description: "",
    coordinates: { lat: 0, lng: 0 }
  });

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    amount: "",
    tax: "0.00",
    total: ""
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await shipmentApi.getAll();
      setShipments(response.data || []);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      toast.error("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShipment = async () => {
    try {
      await shipmentApi.create(newShipment);
      toast.success("Shipment created and email sent to receiver!");
      setIsCreateOpen(false);
      fetchShipments();
      setNewShipment({
        trackingNumber: `CT${Math.floor(10000000 + Math.random() * 90000000)}`.toUpperCase(),
        sender: { name: "", email: "", phone: "" },
        receiver: { name: "", email: "", phone: "" },
        origin: "",
        destination: "",
        status: "pending",
        serviceType: "Express",
        weight: "",
        dimensions: "",
        productDetails: "",
        coordinates: { lat: 0, lng: 0 }
      });
    } catch (error) {
      toast.error("Failed to create shipment");
    }
  };

  const handleSendCommunication = async () => {
    if (!selectedShipment) return;
    try {
      await shipmentApi.communicate(selectedShipment.trackingNumber, communication);
      toast.success("Message sent successfully!");
      setIsCommunicateOpen(false);
      setCommunication({ to: "", subject: "Update regarding your shipment", message: "" });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleAddUpdate = async () => {
    if (!selectedShipment) return;
    try {
      await shipmentApi.addUpdate(selectedShipment.trackingNumber, newUpdate);
      toast.success("Shipment update added!");
      setIsUpdateOpen(false);
      fetchShipments();
    } catch (error) {
      toast.error("Failed to add update");
    }
  };

  const handleSendInvoice = async () => {
    if (!selectedShipment) return;
    try {
      await shipmentApi.sendInvoice(selectedShipment.trackingNumber, invoiceData);
      toast.success("Invoice sent to customer email!");
      setIsInvoiceOpen(false);
      fetchShipments();
    } catch (error) {
      toast.error("Failed to send invoice");
    }
  };

  return (
    <AdminLayout title="Shipments">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Input placeholder="Search tracking number, sender..." className="h-9" />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 brand-red-bg hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" /> Create Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Shipment</DialogTitle>
                <DialogDescription>
                  Enter shipment details. A tracking email will be sent to the receiver automatically.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Tracking Number</label>
                    <Input disabled value={newShipment.trackingNumber} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">Service Type</label>
                    <Input value={newShipment.serviceType} onChange={e => setNewShipment({...newShipment, serviceType: e.target.value})} />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-bold mb-3">Sender Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Sender Name" value={newShipment.sender.name} onChange={e => setNewShipment({...newShipment, sender: {...newShipment.sender, name: e.target.value}})} />
                    <Input placeholder="Sender Email" value={newShipment.sender.email} onChange={e => setNewShipment({...newShipment, sender: {...newShipment.sender, email: e.target.value}})} />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-bold mb-3">Receiver Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Receiver Name" value={newShipment.receiver.name} onChange={e => setNewShipment({...newShipment, receiver: {...newShipment.receiver, name: e.target.value}})} />
                    <Input placeholder="Receiver Email" value={newShipment.receiver.email} onChange={e => setNewShipment({...newShipment, receiver: {...newShipment.receiver, email: e.target.value}})} />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-bold mb-3">Route & Logistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Origin (City, Country)" value={newShipment.origin} onChange={e => setNewShipment({...newShipment, origin: e.target.value})} />
                    <Input placeholder="Destination (City, Country)" value={newShipment.destination} onChange={e => setNewShipment({...newShipment, destination: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input placeholder="Weight (kg)" value={newShipment.weight} onChange={e => setNewShipment({...newShipment, weight: e.target.value})} />
                    <Input placeholder="Dimensions" value={newShipment.dimensions} onChange={e => setNewShipment({...newShipment, dimensions: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Input placeholder="Product Details / Description" value={newShipment.productDetails} onChange={e => setNewShipment({...newShipment, productDetails: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground">Initial Latitude</label>
                      <Input type="number" step="0.0001" value={newShipment.coordinates.lat} onChange={e => setNewShipment({...newShipment, coordinates: {...newShipment.coordinates, lat: parseFloat(e.target.value)}})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground">Initial Longitude</label>
                      <Input type="number" step="0.0001" value={newShipment.coordinates.lng} onChange={e => setNewShipment({...newShipment, coordinates: {...newShipment.coordinates, lng: parseFloat(e.target.value)}})} />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateShipment} className="brand-red-bg">Create Shipment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-background rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Loading shipments...
                </TableCell>
              </TableRow>
            ) : shipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No shipments found.
                </TableCell>
              </TableRow>
            ) : (
              shipments.map((shipment: any) => (
                <TableRow key={shipment._id}>
                  <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                  <TableCell>{shipment.sender?.name || "N/A"}</TableCell>
                  <TableCell>{shipment.receiver?.name || "N/A"}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-[10px] uppercase font-bold bg-muted text-muted-foreground">
                      {shipment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => window.open(`/tracking/${shipment.trackingNumber}`, '_blank')}>
                          <Eye className="mr-2 h-4 w-4" /> View Track Page
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment);
                          setInvoiceData({ amount: "250.00", tax: "12.50", total: "262.50" });
                          setIsInvoiceOpen(true);
                        }}>
                          <FileText className="mr-2 h-4 w-4" /> Send Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment);
                          setCommunication({ ...communication, to: shipment.receiver?.email || "" });
                          setIsCommunicateOpen(true);
                        }}>
                          <MessageSquare className="mr-2 h-4 w-4" /> Message Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedShipment(shipment);
                          setNewUpdate({ ...newUpdate, location: shipment.currentLocation || "" });
                          setIsUpdateOpen(true);
                        }}>
                          <MapPinIcon className="mr-2 h-4 w-4" /> Add Tracking Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Communication Modal */}
      <Dialog open={isCommunicateOpen} onOpenChange={setIsCommunicateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to Customer</DialogTitle>
            <DialogDescription>
              This will send a branded email to the recipient using Continental Track SMTP.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">To</label>
              <Input value={communication.to} onChange={e => setCommunication({...communication, to: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">Subject</label>
              <Input value={communication.subject} onChange={e => setCommunication({...communication, subject: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">Message</label>
              <textarea 
                className="w-full min-h-[150px] p-3 rounded-md border text-sm"
                value={communication.message} 
                onChange={e => setCommunication({...communication, message: e.target.value})}
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCommunicateOpen(false)}>Cancel</Button>
            <Button onClick={handleSendCommunication} className="brand-red-bg">Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Modal */}
      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate & Send Invoice</DialogTitle>
            <DialogDescription>
              Draft an electronic invoice for this shipment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Base Amount ($)</label>
                <Input type="number" value={invoiceData.amount} onChange={e => setInvoiceData({...invoiceData, amount: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Tax ($)</label>
                <Input type="number" value={invoiceData.tax} onChange={e => setInvoiceData({...invoiceData, tax: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">Total Due ($)</label>
              <Input type="number" value={invoiceData.total || (parseFloat(invoiceData.amount || "0") + parseFloat(invoiceData.tax || "0")).toFixed(2)} onChange={e => setInvoiceData({...invoiceData, total: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceOpen(false)}>Cancel</Button>
            <Button onClick={handleSendInvoice} className="brand-red-bg font-bold">Dispatch Electronic Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Tracking Update</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Status</label>
                <select 
                  className="w-full h-10 px-3 rounded-md border text-sm"
                  value={newUpdate.status} 
                  onChange={e => setNewUpdate({...newUpdate, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="in_transit">In Transit</option>
                  <option value="arrived">Arrived at Facility</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Location</label>
                <Input value={newUpdate.location} onChange={e => setNewUpdate({...newUpdate, location: e.target.value})} placeholder="City, Country" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase">Description</label>
              <Input value={newUpdate.description} onChange={e => setNewUpdate({...newUpdate, description: e.target.value})} placeholder="e.g. Arrived at London Heathrow Hub" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Latitude</label>
                <Input type="number" step="0.0001" value={newUpdate.coordinates.lat} onChange={e => setNewUpdate({...newUpdate, coordinates: {...newUpdate.coordinates, lat: parseFloat(e.target.value)}})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase">Longitude</label>
                <Input type="number" step="0.0001" value={newUpdate.coordinates.lng} onChange={e => setNewUpdate({...newUpdate, coordinates: {...newUpdate.coordinates, lng: parseFloat(e.target.value)}})} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUpdate} className="brand-red-bg">Add Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
