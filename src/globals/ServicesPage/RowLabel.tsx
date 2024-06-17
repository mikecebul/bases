"use client";

import { lucideIcons } from "@/components/icons";
import { useRowLabel } from "@payloadcms/ui/forms/RowLabel/Context";
import { useEffect, useState } from "react";
import { Service } from "@/payload-types";

type RowData = {
  id: string;
  service: Service;
};

function RowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>();
  const [relationshipData, setRelationshipData] = useState<Service | null>(
    null
  );

  const Icon = lucideIcons.find(
    (icon) => icon.value === relationshipData?.icon
  )?.component;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/services/${data.service}`
        );
        const result = await response.json();
        setRelationshipData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (data.service) {
      fetchData();
    }
  }, [data.service]);

  if (!!Icon && !!relationshipData)
    return (
      <div className="flex flex-row items-center">
        <Icon className="w-8 h-6 mr-4" />
        <span className="text-lg font-semibold">{`${relationshipData.title} - ${rowNumber}`}</span>
      </div>
    );

  return <span>{`Undefined - ${rowNumber}`}</span>;
}

export default RowLabel;
