"use client";

import React, { Fragment, useCallback, useState } from "react";
import { Button as PayloadButton } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { createServices } from "./action";

export const Button: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleClick = async () => {
    if (loading || seeded) return;

    setLoading(true);
    setError("");

    try {
      await createServices();
      setSeeded(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  let message = "";
  if (loading) message = " (seeding...)";
  if (seeded) message = " (done!)";
  if (error) message = ` (error: ${error})`;

  return (
    <Fragment>
      <PayloadButton
        buttonStyle="secondary"
        className="w-52"
        onClick={handleClick}
      >
        Seed Services
      </PayloadButton>
      <p>{message}</p>
    </Fragment>
  );
};
