"use client";

import { lucideIcons } from "@/components/icons";
import { useField } from "@payloadcms/ui/forms/useField";
import { SelectInput } from "@payloadcms/ui/fields/Select";

const IconSelect = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });

  const Icon = lucideIcons.find((icon) => icon.value === value)?.component;
  return (
    <>
      <label className="field-label">Icon Select</label>
      <div className="flex space-x-8 w-full items-center">
        <SelectInput
          path={path}
          name={path}
          options={lucideIcons}
          value={value}
          onChange={(e) => setValue(e.value)}
          className="min-w-64"
        />
        {!!Icon ? <Icon className="h-12 w-12" /> : null}
      </div>
    </>
  );
};

export default IconSelect;
