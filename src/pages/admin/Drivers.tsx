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
  Truck, 
  MoreHorizontal, 
  MapPin, 
  Phone, 
  Star,
  Activity,
  UserCheck,
  UserMinus,
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
import { driverApi } from "@/lib/api";

export default function AdminDrivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const adminRole = localStorage.getItem("admin_role");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    staffId: "",
    department: "Logistics",
    vehicleType: "Van",
    licensePlate: ""
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await driverApi.getAll();
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast.error("Failed to load drivers from database");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await driverApi.update(id, { status: newStatus });
      setDrivers(prev => prev.map(d => d._id === id ? { ...d, status: newStatus } : d));
      toast.success(`Driver status updated to ${newStatus.replace('_', ' ')}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleAddDriver = async () => {
    try {
      const response = await driverApi.create(newDriver);
      setDrivers(prev => [response.data, ...prev]);
      toast.success("Driver onboarded to database");
      setIsAddModalOpen(false);
      setNewDriver({ name: "", phone: "", staffId: "", department: "Logistics", vehicleType: "Van", licensePlate: "" });
    } catch (error) {
      toast.error("Failed to onboard driver to database");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await driverApi.delete(id);
      setDrivers(prev => prev.filter(d => d._id !== id));
      toast.success("Driver removed from fleet");
    } catch (error) {
      toast.error("Failed to remove driver");
    }
  };

  const filteredDrivers = drivers.filter(d =>
    (d.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.currentLocation?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Fleet & Drivers">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 max-w-md w-full">
          <Input 
            placeholder="Search driver, plate, or location..." 
            className="h-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <Button className="brand-red-bg hover:bg-red-700" onClick={() => setIsAddModalOpen(true)}>
          <Truck className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Onboard New Driver</DialogTitle>
            <DialogDescription>
              Register a new driver to the fleet and company staff directory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4 px-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="drv-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Legal Full Name</Label>
                <Input id="drv-name" value={newDriver.name} onChange={e => setNewDriver({...newDriver, name: e.target.value})} placeholder="e.g. Thomas Miller" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drv-phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Direct Contact Number</Label>
                <Input id="drv-phone" value={newDriver.phone} onChange={e => setNewDriver({...newDriver, phone: e.target.value})} placeholder="+44..." className="h-11" />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Internal Authentication
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="drv-staff" className="text-[10px] font-bold uppercase">Staff Index ID</Label>
                  <Input id="drv-staff" value={newDriver.staffId} onChange={e => setNewDriver({...newDriver, staffId: e.target.value})} placeholder="STF-0000" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase">Operational Department</Label>
                  <Select value={newDriver.department} onValueChange={v => setNewDriver({...newDriver, department: v})}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select dept" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Logistics">Logistics Division</SelectItem>
                      <SelectItem value="Heavy Haulage">Heavy Haulage</SelectItem>
                      <SelectItem value="Last Mile">Last Mile Delivery</SelectItem>
                      <SelectItem value="Express Delivery">Express Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Asset & Vehicle Assignment
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase">Vehicle Category</Label>
                  <Select value={newDriver.vehicleType} onValueChange={v => setNewDriver({...newDriver, vehicleType: v})}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Van">Delivery Van</SelectItem>
                      <SelectItem value="Heavy Truck">Heavy Duty Truck</SelectItem>
                      <SelectItem value="Motorcycle">Express Motorcycle</SelectItem>
                      <SelectItem value="Bicycle">Eco-Friendly Bicycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drv-plate" className="text-[10px] font-bold uppercase">License Plate Index</Label>
                  <Input id="drv-plate" value={newDriver.licensePlate} onChange={e => setNewDriver({...newDriver, licensePlate: e.target.value})} placeholder="UK24 XYZ" className="font-bold tracking-widest uppercase" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDriver} className="brand-red-bg">Assign to Fleet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Driver / Fleet Info</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Location</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Performance</TableHead>
              <TableHead className="text-right font-bold text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <TableRow key={driver._id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <Truck className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm tracking-tight">{driver.name}</p>
                          <span className="text-[9px] bg-primary/10 text-primary font-black px-1.5 rounded uppercase tracking-tighter">
                            {driver.staffId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 leading-none h-4 border-muted-foreground/30">
                            {driver.department}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1 rounded">
                            {driver.licensePlate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {driver.currentLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize text-[9px] font-black tracking-widest px-2 ${
                        driver.status === 'on_delivery' ? 'border-primary text-primary bg-primary/5' : 
                        driver.status === 'active' ? 'border-green-500 text-green-600 bg-green-50' : 
                        'border-gray-400 text-gray-500 bg-gray-50'
                      }`}
                    >
                      {driver.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold">{driver.rating}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium">{driver.trips} Total Trips</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Fleet Control</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Phone className="w-4 h-4 mr-2" /> Contact Driver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Activity className="w-4 h-4 mr-2" /> View Live Route
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {driver.status === 'offline' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(driver._id, 'active')} className="text-green-600">
                            <UserCheck className="w-4 h-4 mr-2" /> Clock In
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(driver._id, 'offline')} className="text-destructive">
                            <UserMinus className="w-4 h-4 mr-2" /> Clock Out
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {adminRole === 'super' && (
                          <DropdownMenuItem onClick={() => handleDelete(driver._id)} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Remove Driver
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No drivers found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
