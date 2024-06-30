"use client";

import { User } from "@payload-types";
import { FieldLabel, useAuth, useField } from "@payloadcms/ui";
import { SelectField } from "@payloadcms/ui";

export const RoleSelect = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });
  const { user } = useAuth<User>();

  const options = () => {
    if (user?.role === "superAdmin")
      return [
        {
          label: "Super Admin",
          value: "superAdmin",
        },
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ];
    return [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "User",
        value: "user",
      },
    ];
  };

  return (
    <>
      <FieldLabel label="Role Select" />
      <SelectField
        path={path}
        name={path}
        options={options()}
        value={value}
        onChange={(val) => setValue(val)}
        className="min-w-64"
      />
    </>
  );
};
