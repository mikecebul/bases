"use client";

import { useRowLabel } from "@payloadcms/ui/forms/RowLabel/Context";
import type { Service } from "@payload-types";
import useSWR from "swr";
import { fetcher } from "@/shared/lib/utils";
import { Icon } from "@/app/components/icons/Icon";

type RowData = {
  id: string;
  service: string;
};

function RowLabel() {
  const {
    data: { service: serviceId },
    rowNumber,
  } = useRowLabel<RowData>();

  const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/services/${serviceId}`;

  const { data: service } = useSWR<Service>(url, fetcher);

  if (!service) return <span>{`${rowNumber} - Service`}</span>;

  return (
    <div className="flex flex-row items-center">
      <span className="text-lg font-semibold mr-8">{rowNumber}</span>
      <Icon name={service.icon} className="w-6 h-6" />
      <span className="text-lg font-semibold ml-4">{service.title}</span>
    </div>
  );
}

export default RowLabel;
