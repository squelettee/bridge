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

      <main className="relative h-full flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col gap-8 items-center text-center max-w-3xl">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-5xl font-medium lg:text-6xl">
              Bringing the world.
            </h1>
            <p className="text-xs font-light lg:text-sm">
              Simplicity Cash Bridge is a bridge that allows you to bridge assets to Bitcoin.
            </p>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <Button variant={"neutral"}>
              Learn More
            </Button>
            <Button variant={"default"} onClick={() => router.push("/dashboard")}>
              Open App
            </Button>
          </div>
        </div>
        <Image
          src="/bg.jpeg"
          alt="Home Page"
          width={1000}
          height={1000}
          className="mt-2 rounded-base object-contain transition-transform duration-300 hover:scale-105"
        />
      </main>
      <footer className="fixed left-0 bottom-0 z-20 mx-auto flex h-[70px] w-full items-center border-t-4 border-border bg-secondary-background px-5">
        <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
          <div className="flex items-center xl:gap-10 gap-10" />
          <div className="flex items-center gap-4">
            <Button variant={"neutral"} onClick={() => router.push("/docs")}>
              Learn More
            </Button>
            <Button variant={"neutral"} onClick={() => router.push("/docs")}>
              Docs
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
