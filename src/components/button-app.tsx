"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AppButton() {
  const router = useRouter();

  return (
    <Button size={"default"} variant={"neutral"} onClick={() => router.push("/dashboard")}>
      Open App
    </Button>
  )
}
