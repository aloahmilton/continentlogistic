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
  MessageSquare, 
  User, 
  Clock, 
  Mail, 
  MoreHorizontal,
  Reply,
  Trash2,
  CheckCircle,
  AlertCircle
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { messageApi } from "@/lib/api";

export default function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    message: "",
    category: "support"
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await messageApi.getAll();
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages from database");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await messageApi.markAsRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, status: 'read' } : m));
      toast.success("Message marked as read");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await messageApi.delete(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await messageApi.create({ 
        receiver: newMessage.recipient, 
        sender: "admin-system", // Should be real ID
        subject: newMessage.subject, 
        message: newMessage.message, 
        type: 'admin' 
      });
      setMessages(prev => [response.data, ...prev]);
      toast.success("Dispatch sent via database");
      setIsAddModalOpen(false);
      setNewMessage({ recipient: "", subject: "", message: "", category: "support" });
    } catch (error) {
      toast.error("Failed to save dispatch to database");
    }
  };

  const filtered = messages.filter(m => 
    (m.sender && String(m.sender.name || m.sender).toLowerCase().includes(searchTerm.toLowerCase())) || 
    (m.subject && m.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="System Communications">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 max-w-md w-full">
          <Input 
            placeholder="Search by sender or subject..." 
            className="h-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold px-3 py-1">
            {messages.filter(m => m.status === 'unread').length} Unread
          </Badge>
          <Button className="brand-red-bg hover:bg-red-700" onClick={() => setIsAddModalOpen(true)}>
            <MessageSquare className="w-4 h-4 mr-2" /> New Dispatch
          </Button>
        </div>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Internal Dispatch</DialogTitle>
            <DialogDescription>
              Send a system notification directly to a customer's portal dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="msg-recipient">Recipient Customer</Label>
              <Input id="msg-recipient" value={newMessage.recipient} onChange={e => setNewMessage({...newMessage, recipient: e.target.value})} placeholder="Customer Name or Email" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="msg-subject">Subject</Label>
                <Input id="msg-subject" value={newMessage.subject} onChange={e => setNewMessage({...newMessage, subject: e.target.value})} placeholder="Re: Shipment Update" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newMessage.category} onValueChange={v => setNewMessage({...newMessage, category: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="system">System Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-content">Message Content</Label>
              <Textarea id="msg-content" value={newMessage.message} onChange={e => setNewMessage({...newMessage, message: e.target.value})} placeholder="Type your internal message here..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage} className="brand-red-bg">Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Sender & Subject</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Category</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Received</TableHead>
              <TableHead className="text-right font-bold text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((msg) => (
              <TableRow key={msg._id} className={`hover:bg-muted/30 transition-colors ${msg.status === 'unread' ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.status === 'unread' ? 'brand-red-bg text-white' : 'bg-muted text-muted-foreground'}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm tracking-tight truncate ${msg.status === 'unread' ? 'font-black' : 'font-bold'}`}>{msg.sender}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate">{msg.subject}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest px-2 py-0">
                    {msg.category}
                  </Badge>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-1.5">
                    {msg.status === 'unread' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-primary" />
                    ) : msg.status === 'replied' ? (
                      <Reply className="w-3.5 h-3.5 text-blue-500" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    )}
                    <span className={`text-[10px] uppercase font-black tracking-widest ${msg.status === 'unread' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {msg.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Clock className="w-3 h-3" />
                      {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => toast.info("Opening message detail...")}>
                      <Mail className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Msg Options</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleMarkRead(msg._id)}>
                          <CheckCircle className="w-4 h-4 mr-2" /> Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Opening reply modal...")}>
                          <Reply className="w-4 h-4 mr-2" /> Reply
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(msg._id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
