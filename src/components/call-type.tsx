import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CallTypeProps {
  setSelected: (params: string) => void;
}

export function CallType({ setSelected }: CallTypeProps) {

  function handleSelectChange(event: { target: { value: any } }) {
    setSelected(event.target.value);
  }

  return (
    <div className="flex-grow">
      <Select
        defaultValue="auto-dialer"
        onValueChange={(value: string) =>
          handleSelectChange({ target: { value } })
        }
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger className="mx-auto font-medium text-base w-auto flex gap-2 h-4 p-0 border-none transition hover:text-gray-500">
              <SelectValue placeholder="Call Mode" />
            </SelectTrigger>
          </TooltipTrigger>
          <TooltipContent>Call Mode</TooltipContent>
        </Tooltip>
        <SelectContent>
          <SelectItem value="auto-dialer">Auto Dialer</SelectItem>
          <SelectItem value="manual-call">Manual Call</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
