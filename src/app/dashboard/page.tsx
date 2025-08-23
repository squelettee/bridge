"use client"

import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

import TableDemo from "@/components/data-table-demo"

import { AppSidebar } from "@/components/app-sidebar"
import ButtonTheme from "@/components/button-theme"
import ConnectWalletButton from "@/components/connect-wallet-button"
import { Button } from "@/components/ui/button"
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingUp, Wallet } from "lucide-react"

export default function Page() {
  // Données en dur pour le moment
  const userStats = {
    totalPortfolio: "$24,567.89",
    totalDeposits: "$18,234.56",
    totalEarnings: "$1,234.56",
    change24h: "+5.67%",
    isPositive: true
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-end">
          <div className="flex items-center gap-2 px-4">
            <ButtonTheme />
            <ConnectWalletButton />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Card 1: Bridge Status */}
            <div className="aspect-video rounded-base border border-border shadow p-6 flex flex-col justify-between bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  <h3 className="text-lg font-extrabold">Bridge Status</h3>
                </div>
                <div className={`flex items-center gap-1 text-sm font-extrabold ${userStats.isPositive ? '' : ''}`}>
                  {userStats.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {userStats.change24h}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-extrabold">Active</p>
                <p className="text-sm font-bold">All systems operational</p>
              </div>
              <Button variant={"neutral"} className="w-full font-extrabold border shadow transition">
                View Status
              </Button>
            </div>

            {/* Card 2: Deposit Management */}
            <div className="aspect-video rounded-base border border-border shadow p-6 flex flex-col justify-between bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-6 w-6" />
                  <h3 className="text-lg font-extrabold">My Deposits</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-extrabold">{userStats.totalDeposits}</p>
                <p className="text-sm font-bold">Spread across 3 cryptos</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 font-extrabold border shadow transition">
                  Deposit
                </Button>
                <Button variant={"neutral"} className="flex-1 font-extrabold border shadow transition">
                  Withdraw
                </Button>
              </div>
            </div>

            {/* Card 3: Points & Rewards */}
            <div className="aspect-video rounded-base border border-border shadow p-6 flex flex-col justify-between bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <h3 className="text-lg font-extrabold">Points</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-extrabold">{userStats.totalEarnings}</p>
                <p className="text-sm font-bold">Earned from bridge usage</p>
              </div>
              <Button variant={"neutral"} className="w-full font-extrabold border shadow transition">
                History
              </Button>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-base border-0 border-border md:min-h-min">
            <TableDemo />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
