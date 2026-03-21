import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
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
    trackingNumber: `CT${Math.floor(10000000 + Math.random() * 90000000)}`,
    sender: { name: "", email: "", phone: "" },
    receiver: { name: "", email: "", phone: "" },
    origin: "",
    destination: "",
    status: "pending",
    serviceType: "Express",
    weight: "",
    dimensions: ""
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
      // Reset form
      setNewShipment({
        trackingNumber: `CT${Math.floor(10000000 + Math.random() * 90000000)}`,
        sender: { name: "", email: "", phone: "" },
        receiver: { name: "", email: "", phone: "" },
        origin: "",
        destination: "",
        status: "pending",
        serviceType: "Express",
        weight: "",
        dimensions: ""
      });
    } catch (error) {
      console.error("Error creating shipment:", error);
      toast.error("Failed to create shipment");
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
              shipments.map((shipment) => (
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
    </AdminLayout>
  );
}
