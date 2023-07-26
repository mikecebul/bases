"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toast() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Contact Form",
          description: "",
          action: <ToastAction altText="close">close</ToastAction>,
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
