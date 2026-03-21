import AdminLayout from "@/components/admin/AdminLayout";
import { Hammer } from "lucide-react";

export default function AdminPlaceholder() {
  return (
    <AdminLayout title="Module Under Construction">
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-background rounded-lg border border-dashed border-border">
        <div className="w-16 h-16 rounded-full brand-yellow-bg flex items-center justify-center mb-6">
          <Hammer className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Work in Progress</h2>
        <p className="text-muted-foreground max-w-md">
          This administrative module is currently under development or requires an extended license. Please check back later or contact your system administrator.
        </p>
      </div>
    </AdminLayout>
  );
}
