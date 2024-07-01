"use client";

import React, { Fragment, useActionState } from "react";
import { Button as PayloadButton } from "@payloadcms/ui";
import { createServices } from "./action";

export const Button = () => {
  const [state, action, isPending] = useActionState(createServices, null);

  return (
    <Fragment>
      <PayloadButton
        buttonStyle="secondary"
        className="w-52"
        onClick={() => {
          action();
        }}
        disabled={isPending}
      >
        {isPending ? "Seeding..." : "Seed Services"}
      </PayloadButton>
      {!!state?.error ? (
        <p className="text-red-500">Error: {state.error}</p>
      ) : null}
      {!!state?.success ? (
        <p className="text-green-500">Success: {state.success}</p>
      ) : null}
    </Fragment>
  );
};
