import { Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

export function AlertBox() {
  return (
    <div className="flex items-center p-4 space-x-4 border-2 border-solid border-yellow-500/50">
      <Info className="w-8 h-8 text-yellow-500" />
      <p className="my-0 text-xl text-yellow-500">Link example: /services</p>
    </div>
  );
}
