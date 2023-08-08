"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOUtButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
    });
    router.push("/");
  };
  return (
    <Button
      variant="outline"
      className="justify-center w-full"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
