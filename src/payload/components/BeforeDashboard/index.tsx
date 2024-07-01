import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { SeedButton } from "@/payload/collections/Services/SeedButton/Index";

const baseClass = "before-dashboard";

export const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Alert>
        <AlertTitle>Welcome to the dashboard!</AlertTitle>
        <AlertDescription>
          <SeedButton />
        </AlertDescription>
      </Alert>
    </div>
  );
};
