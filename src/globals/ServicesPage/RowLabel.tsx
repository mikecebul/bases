"use client";

import { lucideIcons } from "@/components/icons";
import { useRowLabel } from "@payloadcms/ui/forms/RowLabel/Context";
import { useMemo } from "react";
import { Service } from "@/payload-types";
import useSWR from "swr";

type RowData = {
  id: string;
  service: string;
};

const fetcher = (url: string): Promise<Service> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

function RowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>();

  const { data: relationshipData } = useSWR<Service>(
    data.service
      ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/services/${data.service}`
      : null,
    fetcher
  );

  const Icon = useMemo(
    () =>
      lucideIcons.find((icon) => icon.value === relationshipData?.icon)
        ?.component,
    [relationshipData]
  );

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
