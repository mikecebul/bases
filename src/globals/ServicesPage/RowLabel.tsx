"use client";

import { lucideIcons } from "@/components/icons";
import { useRowLabel } from "@payloadcms/ui/forms/RowLabel/Context";
import { useEffect, useState, useMemo } from "react";
import { Service } from "@/payload-types";

type RowData = {
  id: string;
  service: string;
};

const serviceCache = new Map<string, Service>();

function RowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>();
  const [relationshipData, setRelationshipData] = useState<Service | null>(
    null
  );

  const Icon = useMemo(
    () =>
      lucideIcons.find((icon) => icon.value === relationshipData?.icon)
        ?.component,
    [relationshipData]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (serviceCache.has(data.service)) {
        setRelationshipData(serviceCache.get(data.service) || null);
      } else {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/services/${data.service}`
          );
          const result: Service = await response.json();
          serviceCache.set(data.service, result);
          setRelationshipData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    if (data.service) {
      fetchData();
    }
  }, [data.service]);

  if (!Icon) return <span>{`${rowNumber} - Service`}</span>;

  return (
    <div className="flex flex-row items-center">
      <span className="text-lg font-semibold mr-8">{rowNumber}</span>
      <Icon className="w-8 h-6" />
      <span className="text-lg font-semibold ml-4">
        {relationshipData?.title}
      </span>
    </div>
  );
}

export default RowLabel;
