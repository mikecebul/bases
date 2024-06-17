"use client";

import { lucideIcons } from "@/components/icons";
import { useField } from "@payloadcms/ui/forms/useField";
import { Select } from "@payloadcms/ui/fields/Select";
import Icon from "@/components/Icon";
import { useState } from "react";

export const IconSelect = ({ path }: { path: string }) => {
  const { initialValue, value, setValue } = useField<string>({ path });
  const [name, setName] = useState<string>(initialValue ?? "");

  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }));

  console.log("initial value:", initialValue);

  return (
    <>
      <label className="field-label">Icon Select</label>
      <div className="flex items-center w-full space-x-8">
        <Select
          path={path}
          name={path}
          options={options}
          value={value}
          onChange={(val) => {
            setValue(val);
            setName(val);
          }}
          className="min-w-64"
        />
        <Icon name={name} className="w-12 h-12" />
      </div>
    </>
  );
};
