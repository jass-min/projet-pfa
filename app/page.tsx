import DevicesTable from "@/app/adminDashboard/DevicesTable";
import MeasuresTable from "@/app/adminDashboard/MeasuresTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Import
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Measure
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <MeasuresTable />
        <DevicesTable />
      </TabsContent>
    </Tabs>
  );
}
