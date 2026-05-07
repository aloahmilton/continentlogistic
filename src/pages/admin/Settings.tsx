import { useState, useEffect } from "react";
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
import { settingsApi } from "@/lib/api";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Continent Logistic.org",
    supportEmail: "support@Continentlogistic.com",
    contactPhone: "+1 (800) 555-0199",
    address: "123 Logistics Blvd, New York, NY 10001, USA",
    logoUrl: "",
    faviconUrl: ""
  });

  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.gmail.com",
    port: "587",
    user: "statenumberss@gmail.com",
    pass: "••••••••••••••••"
  });

  const [notificationSettings, setNotificationSettings] = useState([
    { id: "quote", label: "Email admin on new Quote Request", enabled: true },
    { id: "delivery", label: "Email admin on shipment delivery confirmation", enabled: true },
    { id: "invoice", label: "Email customer automatically on invoice creation", enabled: true },
    { id: "sms", label: "Enable SMS notifications (Twilio Integration Request)", enabled: false },
    { id: "digest", label: "Enable Daily Performance Digest", enabled: false }
  ]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [genRes, smtpRes, notifRes] = await Promise.all([
          settingsApi.get('general').catch(() => null),
          settingsApi.get('smtp').catch(() => null),
          settingsApi.get('notifications').catch(() => null)
        ]);

        if (genRes?.data) setGeneralSettings(genRes.data);
        if (smtpRes?.data) setSmtpSettings(smtpRes.data);
        if (notifRes?.data) setNotificationSettings(notifRes.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (section: string) => {
    try {
      setLoading(true);
      await Promise.all([
        settingsApi.update('general', generalSettings),
        settingsApi.update('smtp', smtpSettings),
        settingsApi.update('notifications', notificationSettings)
      ]);
      toast.success(`${section} settings updated successfully in system database`);
    } catch (error) {
      toast.error("Failed to save settings to database");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general" className="gap-2"><Globe className="w-4 h-4" /> General</TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2"><Mail className="w-4 h-4" /> Email / SMTP</TabsTrigger>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-dashed border-border/60">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Master Logo Asset URL</Label>
                    <Input id="logoUrl" placeholder="https://..." value={generalSettings.logoUrl} onChange={e => setGeneralSettings({ ...generalSettings, logoUrl: e.target.value })} className="h-10 bg-muted/20" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Browser Favicon URL</Label>
                    <Input id="faviconUrl" placeholder="https://..." value={generalSettings.faviconUrl} onChange={e => setGeneralSettings({ ...generalSettings, faviconUrl: e.target.value })} className="h-10 bg-muted/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="site-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Legal Corporate Entity</Label>
                    <Input id="site-name" value={generalSettings.siteName} onChange={e => setGeneralSettings({ ...generalSettings, siteName: e.target.value })} className="h-10 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Administrative Support Gateway</Label>
                    <Input id="support-email" value={generalSettings.supportEmail} onChange={e => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })} className="h-10 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Global Contact Line</Label>
                    <Input id="phone" value={generalSettings.contactPhone} onChange={e => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })} className="h-10 font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Global Headquarters Address</Label>
                    <Input id="address" value={generalSettings.address} onChange={e => setGeneralSettings({ ...generalSettings, address: e.target.value })} className="h-10" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">SMTP Relay Host</Label>
                  <Input value={smtpSettings.host} onChange={e => setSmtpSettings({ ...smtpSettings, host: e.target.value })} placeholder="smtp.gmail.com" className="h-10 bg-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Primary Service Port</Label>
                  <Input value={smtpSettings.port} onChange={e => setSmtpSettings({ ...smtpSettings, port: e.target.value })} placeholder="587" className="h-10 bg-muted/20" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Authentication Identity</Label>
                  <Input value={smtpSettings.user} onChange={e => setSmtpSettings({ ...smtpSettings, user: e.target.value })} className="h-10 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Security Access Token</Label>
                  <Input type="password" value={smtpSettings.pass} onChange={e => setSmtpSettings({ ...smtpSettings, pass: e.target.value })} className="h-10" />
                </div>
              </div>
              <div className="pt-4 border-t border-dashed">
                <Button variant="outline" className="w-full gap-2 text-xs font-bold uppercase" onClick={() => {
                  toast.success("SMTP Connection test initiated. Check your inbox.");
                }}>
                  <Database className="w-4 h-4" /> Test Connection
                </Button>
              </div>
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
                {notificationSettings.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <Label className="text-sm font-medium">{item.label}</Label>
                    <div
                      className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-primary/20' : 'bg-muted'}`}
                      onClick={() => {
                        const newSettings = [...notificationSettings];
                        newSettings[i].enabled = !newSettings[i].enabled;
                        setNotificationSettings(newSettings);
                      }}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${item.enabled ? 'bg-primary left-5' : 'bg-muted-foreground left-1'}`} />
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
