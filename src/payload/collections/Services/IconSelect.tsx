"use client";

import { lucideIcons } from "@/app/components/icons";
import { useField } from "@payloadcms/ui";
import { SelectField } from "@payloadcms/ui";
import { Icon } from "@/app/components/icons/Icon";
import { useState } from "react";

export const IconSelect = ({ path }: { path: string }) => {
  const { initialValue, value, setValue } = useField<string>({ path });
  const [name, setName] = useState<string>(initialValue ?? "");

  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }));

  return (
    <>
      <label className="field-label">Icon Select</label>
      <div className="flex items-center w-full space-x-8">
        <SelectField
          path={path}
          name={path}
          options={options}
          value={value}
          onChange={(val) => {
            setValue(val);
            if (typeof val === "string") setName(val);
          }}
          className="min-w-64"
        />
        <Icon name={name} className="w-12 h-12" />
      </div>
    </>
  );
};
