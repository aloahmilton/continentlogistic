import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Mail, 
  Shield, 
  Save, 
  Upload, 
  Bell, 
  Database,
  Lock
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Continental Track",
    supportEmail: "support@continentaltrack.com",
    contactPhone: "+237 659 036 005",
    address: "Global Logistics Hub, Douala, Cameroon"
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.gmail.com",
    port: "587",
    user: "statenumberss@gmail.com",
    pass: "••••••••••••••••"
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`${section} updated successfully in system database`);
    }, 1000);
  };

  return (
    <AdminLayout title="System Settings">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black font-serif tracking-tight text-foreground">Configuration</h2>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Manage global site behavior and security</p>
        </div>
        <Button className="brand-red-bg hover:bg-red-700" onClick={() => handleSave("All Settings")}>
          <Save className="w-4 h-4 mr-2" /> Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general" className="gap-2"><Globe className="w-4 h-4" /> General</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2"><Mail className="w-4 h-4" /> Email / SMTP</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="w-4 h-4" /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="w-4 h-4" /> Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> Branding & Identity
                </CardTitle>
                <CardDescription>Configure how your company appears to customers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-8 pb-6 border-b border-dashed">
                  <div className="w-24 h-24 rounded-xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-2 group cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-[9px] font-black uppercase mt-2">Upload Logo</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs font-bold uppercase">Favicon (.ico)</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Path to favicon..." className="h-9" disabled />
                      <Button variant="outline" size="sm">Choose</Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name" className="text-xs font-bold uppercase">Legal Entity Name</Label>
                    <Input id="site-name" value={generalSettings.siteName} onChange={e => setGeneralSettings({...generalSettings, siteName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email" className="text-xs font-bold uppercase">Public Support Email</Label>
                    <Input id="support-email" value={generalSettings.supportEmail} onChange={e => setGeneralSettings({...generalSettings, supportEmail: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase">Main Contact Phone</Label>
                    <Input id="phone" value={generalSettings.contactPhone} onChange={e => setGeneralSettings({...generalSettings, contactPhone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-bold uppercase">Headquarters Address</Label>
                    <Input id="address" value={generalSettings.address} onChange={e => setGeneralSettings({...generalSettings, address: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="smtp">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> SMTP Server Configuration
              </CardTitle>
              <CardDescription>Configure outgoing email settings for invoices and tracking updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">SMTP Host</Label>
                  <Input value={smtpSettings.host} onChange={e => setSmtpSettings({...smtpSettings, host: e.target.value})} placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">SMTP Port</Label>
                  <Input value={smtpSettings.port} onChange={e => setSmtpSettings({...smtpSettings, port: e.target.value})} placeholder="587" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Username / Email</Label>
                  <Input value={smtpSettings.user} onChange={e => setSmtpSettings({...smtpSettings, user: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">App Password / Secret</Label>
                  <Input type="password" value={smtpSettings.pass} onChange={e => setSmtpSettings({...smtpSettings, pass: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 border-t border-dashed">
                <Button variant="outline" className="w-full gap-2 text-xs font-bold uppercase" onClick={() => toast.info("Sending test email...")}>
                  <Database className="w-4 h-4" /> Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 brand-red-text" /> Administrative Access
              </CardTitle>
              <CardDescription>Update your secure admin credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Admin URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">/</span>
                  <Input value="admin" disabled className="bg-muted font-mono" />
                  <p className="text-[10px] text-muted-foreground font-bold italic ml-2">Configured in system environment (.env)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dashed">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Confirm Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button className="brand-red-bg gap-2 w-full mt-4">
                <Lock className="w-4 h-4" /> Update Auth Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">System Alerts</CardTitle>
              <CardDescription>Control which events trigger administrative emails.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Email admin on new Quote Request",
                  "Email admin on shipment delivery confirmation",
                  "Email customer automatically on invoice creation",
                  "Enable SMS notifications (Twilio Integration Request)",
                  "Enable Daily Performance Digest"
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <Label className="text-sm font-medium">{item}</Label>
                    <div className="w-10 h-6 bg-primary/20 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-primary rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
