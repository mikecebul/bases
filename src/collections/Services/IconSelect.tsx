"use client";

import { lucideIcons } from "@/components/icons";
import { useField } from "@payloadcms/ui/forms/useField";
import { Select } from "@payloadcms/ui/fields/Select";

export const IconSelect = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });

  const Icon = lucideIcons.find((icon) => icon.value === value)?.component;
  const options = lucideIcons.map((icon) => ({
    label: icon.label,
    value: icon.value,
  }));

  return (
    <>
      <label className="field-label">Icon Select</label>
      <div className="flex items-center w-full space-x-8">
        <Select
          path={path}
          name={path}
          options={options}
          value={value}
          onChange={(val) => setValue(val)}
          className="min-w-64"
        />
        {!!Icon ? <Icon className="w-12 h-12" /> : null}
      </div>
    </>
  );
};
