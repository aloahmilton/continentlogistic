import { useState, useEffect } from "react";
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
import { userApi } from "@/lib/api";

const TIMEZONES = [
  { label: "Eastern (ET)", value: "America/New_York" },
  { label: "Central (CT)", value: "America/Chicago" },
  { label: "Mountain (MT)", value: "America/Denver" },
  { label: "Pacific (PT)", value: "America/Los_Angeles" },
  { label: "UTC +00:00", value: "UTC" }
];

const LANGUAGES = [
  { label: "English (US)", value: "English (US)" },
  { label: "French (FR)", value: "French (FR)" },
  { label: "Spanish (ES)", value: "Spanish (ES)" }
];

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    _id: "",
    name: "System Administrator",
    email: "Continentlogistic01@gmail.com",
    role: "Super Admin",
    language: "English (US)",
    timezone: "UTC +00:00"
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notifications, setNotifications] = useState([
    { id: "email", label: "Email Alerts", desc: "New shipment requests", enabled: true },
    { id: "system", label: "System Status", desc: "Server and API health", enabled: true },
    { id: "security", label: "Security Logs", desc: "New login attempts", enabled: true }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setProfile({
          ...profile,
          ...userObj
        });
      } catch (e) {
        console.error("Failed to parse admin_user", e);
      }
    }
  }, []);

  const handleSave = async () => {
    if (!profile._id) {
      toast.error("User ID not found");
      return;
    }

    setIsSaving(true);
    try {
      const { _id, ...updatePayload } = profile;
      const res = await userApi.update(_id, updatePayload);

      // Update local storage so the new name/email reflect in the header
      localStorage.setItem("admin_user", JSON.stringify(res.data));

      toast.success("Profile updated successfully", {
        icon: <CheckCircle2 className="w-4 h-4 text-green-500" />
      });
    } catch (error) {
      toast.error("Failed to update profile to database");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!profile._id) return;
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsSaving(true);
    try {
      // In a real system, you would verify currentPassword on the backend as well.
      await userApi.update(profile._id, { password: passwordForm.newPassword });
      toast.success("Password updated securely.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setIsSaving(false);
    }
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
                      <Input id="name" className="pl-10" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="email" className="pl-10" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 text-muted-foreground w-4 h-4 pointer-events-none" />
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                        value={profile.language}
                        onChange={e => setProfile({ ...profile, language: e.target.value })}
                      >
                        {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timezone</Label>
                    <div className="relative">
                      <Bell className="absolute left-3 top-3 text-muted-foreground w-4 h-4 pointer-events-none" />
                      <select
                        id="timezone"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                        value={profile.timezone}
                        onChange={e => setProfile({ ...profile, timezone: e.target.value })}
                      >
                        {TIMEZONES.map(z => <option key={z.value} value={z.value}>{z.label}</option>)}
                      </select>
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
                  <Input type="password" placeholder="••••••••" value={passwordForm.currentPassword} onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">New Password</Label>
                    <Input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Confirm New Password</Label>
                    <Input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
                <Button variant="outline" onClick={handleUpdatePassword} disabled={isSaving || !passwordForm.newPassword}>Update Password</Button>
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
                {notifications.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0 border-border/50">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tighter">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'brand-red-bg' : 'bg-muted'}`}
                      onClick={() => {
                        const newNotifs = [...notifications];
                        newNotifs[i].enabled = !newNotifs[i].enabled;
                        setNotifications(newNotifs);
                      }}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`}></div>
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
                  <span className="text-muted-foreground text-right">{new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
