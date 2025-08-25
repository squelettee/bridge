"use client"

import NavHome from "@/components/nav-home";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen max-w-screen-2xl mx-auto">
      <NavHome />

      <main className="relative flex min-h-[100dvh] flex-col gap-4 overflow-hidden items-center justify-center bg-background px-5 md:py-[200px] py-[100px] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <div className="flex gap-4 items-center justify-center">
          <Button variant={"neutral"}>
            Learn More
          </Button>
          <Button variant={"default"} onClick={() => router.push("/dashboard")}>
            Open App
          </Button>
        </div>
        <Image src="/bg.png" alt="Home Page" width={1000} height={1000} className="rounded-base" />
      </main>
    </div>
  )
}
