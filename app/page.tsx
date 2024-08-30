import { ChevronDown, ListMinus } from "lucide-react";
import Sidebar from "./(sidebar)/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import JobCard from "./JobCard";
export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-10 container my-5">
      <div className="col-span-3 md:block hidden">
        <Sidebar />
      </div>
      <div className="col-span-9">
        <Sheet>
          <SheetTrigger className="block my-5 cursor-pointer md:hidden w-11/12 bg-[#e4e2e3] font-semibold text-xl mx-auto p-2 relative">
            Companies
            <ListMinus className="absolute right-1 top-1/2 -translate-y-1/2 rotate-180" />
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="flex justify-end gap-2">
          Sorting by:{" "}
          <span className="text-emerald-600 flex items-center cursor-pointer">
            Top match <ChevronDown />
          </span>
        </div>
        {/* banner start */}
        <div className="md:p-10 p-5 md:text-base text-sm rounded-lg flex justify-between items-center bg-[#3d8c41] text-white my-5">
          <div className="flex flex-col md:gap-5 gap-2">
            <h3 className="font-semibold">UI Designer in Egypt</h3>
            <p>70 Job positions</p>
          </div>
          <div className="flex items-center gap-5">
            Set alert
            <Switch />
          </div>
        </div>
        {/* banner end */}
        <main className="space-y-5">
          <JobCard />
          <JobCard />
        </main>
      </div>
    </div>
  );
}
