import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Upload, Settings} from "lucide-react";

export function SidebarSettings() {

  return (
    <div className="flex-grow-0 flex gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-7" variant="ghost" size="icon">
            <Upload className="h-4 w-4" />
            <span className="sr-only">Upload Call List</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Upload Call List</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="w-7" variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
    </div>
  );
}
