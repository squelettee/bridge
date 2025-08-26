"use client"

import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

import TableDemo from "@/components/data-table-demo"
import DepositDialog from "@/components/deposit-dialog"
import WithdrawDialog from "@/components/withdraw-dialog"

import { AppSidebar } from "@/components/app-sidebar"
import ButtonTheme from "@/components/button-theme"
import ConnectWalletButton from "@/components/connect-wallet-button"
import { Button } from "@/components/ui/button"
import { TrendingUp, Wallet } from "lucide-react"

export default function Page() {
  // Données en dur pour le moment
  const userStats = {
    totalPortfolio: "$24,567.89",
    totalDeposits: "$18,234.56",
    totalEarnings: "$1,234.56",
    change24h: "+5.67%",
    isPositive: true
  }

  interface CryptoAsset {
    asset: string
    symbol: string
    image: string
    totalVault: string
    totalBorrowed: string
    userShare: string
    pointsPerDeposit: string
    minDeposit: string
    maxDeposit: string
  }

  const handleDeposit = (crypto: CryptoAsset, amount: string) => {
    console.log(`Depositing ${amount} ${crypto.symbol}`)
    // Ici vous pouvez ajouter la logique pour traiter le dépôt
  }

  const handleWithdraw = (crypto: CryptoAsset, amount: string, isInstant: boolean) => {
    console.log(`Withdrawing ${amount} ${crypto.symbol} - Instant: ${isInstant}`)
    // Ici vous pouvez ajouter la logique pour traiter le retrait
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
            {/* Card 1: Deposit Management - Takes 2/3 of space */}
            <div className="rounded-base border border-border shadow p-6 flex flex-col justify-between bg-background md:col-span-2">
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
                <DepositDialog
                  trigger={
                    <Button className="flex-1 font-extrabold border shadow transition">
                      Deposit
                    </Button>
                  }
                  onDeposit={handleDeposit}
                />
                <WithdrawDialog
                  trigger={
                    <Button variant={"neutral"} className="flex-1 font-extrabold border shadow transition">
                      Withdraw
                    </Button>
                  }
                  onWithdraw={handleWithdraw}
                />
              </div>
            </div>

            {/* Card 2: Points & Rewards - Takes 1/3 of space */}
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
