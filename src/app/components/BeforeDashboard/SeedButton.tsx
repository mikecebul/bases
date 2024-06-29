"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import { buttonVariants } from "../ui/button";

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (loading || seeded) return;

      setLoading(true);

      try {
        await fetch("/api/seed");
        setSeeded(true);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, seeded]
  );

  let message = "";
  if (loading) message = " (seeding...)";
  if (seeded) message = " (done!)";
  if (error) message = ` (error: ${error})`;

  return (
    <Fragment>
      <Link
        className={cn(buttonVariants({ variant: "brand" }))}
        href="/api/seed"
        onClick={handleClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        Seed your database
      </Link>
      {message}
    </Fragment>
  );
};
