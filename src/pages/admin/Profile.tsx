import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Bell, 
  Globe, 
  Save,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "System Administrator",
    email: "admin@continentaltrack.com",
    role: "Super Admin",
    language: "English (US)",
    timezone: "UTC +00:00"
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully", {
        icon: <CheckCircle2 className="w-4 h-4 text-green-500" />
      });
    }, 1000);
  };

  return (
    <AdminLayout title="Admin Profile & Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full brand-red-bg flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-lg">
            A
          </div>
          <div>
            <h2 className="text-3xl font-black font-serif tracking-tight">{profile.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{profile.role}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4" /> Personal Information
                </CardTitle>
                <CardDescription className="text-xs">Update your basic account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="name" className="pl-10" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="email" className="pl-10" type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="language" className="pl-10" value={profile.language} onChange={e => setProfile({...profile, language: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timezone</Label>
                    <div className="relative">
                      <Bell className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="timezone" className="pl-10" value={profile.timezone} onChange={e => setProfile({...profile, timezone: e.target.value})} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className="brand-red-bg hover:bg-red-700">
                  <Save className="w-4 h-4 mr-2" /> {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Security & Password
                </CardTitle>
                <CardDescription className="text-xs">Manage your authentication and password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase">Current Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">New Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Confirm New Password</Label>
                    <Input type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
                <Button variant="outline">Update Password</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Email Alerts", desc: "New shipment requests" },
                  { label: "System Status", desc: "Server and API health" },
                  { label: "Security Logs", desc: "New login attempts" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-border/50">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="w-10 h-5 bg-muted rounded-full relative cursor-pointer">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm border-dashed bg-muted/10">
              <CardHeader>
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">System Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">VERSION</span>
                  <span className="text-muted-foreground">v2.4.0-PRO</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">ENVIRONMENT</span>
                  <span className="text-muted-foreground">Production</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold">LAST LOGIN</span>
                  <span className="text-muted-foreground text-right">Mar 21, 2026 - 20:45</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
