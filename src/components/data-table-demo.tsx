import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Image from "next/image"
import DepositDialog from "./deposit-dialog"
import WithdrawDialog from "./withdraw-dialog"

const vaultData = [
  {
    asset: "Ethereum",
    symbol: "ETH",
    image: "/eth.svg",
    totalVault: "1,247.85 ETH",
    totalBorrowed: "89.32 ETH",
    userShare: "0 ETH",
    pointsPerDeposit: "10 points per ETH",
    minDeposit: "0.1 ETH",
    maxDeposit: "100 ETH"
  },
  {
    asset: "Solana",
    symbol: "SOL",
    image: "/solana.svg",
    totalVault: "45.9K SOL",
    totalBorrowed: "12.5K SOL",
    userShare: "0 SOL",
    pointsPerDeposit: "15 points per SOL",
    minDeposit: "1 SOL",
    maxDeposit: "1K SOL"
  },
  {
    asset: "Hype",
    symbol: "HYPE",
    image: "/hype.svg",
    totalVault: "2.85M HYPE",
    totalBorrowed: "156.8K HYPE",
    userShare: "0 HYPE",
    pointsPerDeposit: "25 points per 100 HYPE",
    minDeposit: "100 HYPE",
    maxDeposit: "100K HYPE"
  }
]

export default function VaultTable() {
  const handleDeposit = (crypto: typeof vaultData[0], amount: string) => {
    console.log(`Depositing ${amount} ${crypto.symbol}`)
    // Ici vous pouvez ajouter la logique pour traiter le dépôt
  }

  const handleWithdraw = (crypto: typeof vaultData[0], amount: string, isInstant: boolean) => {
    console.log(`Withdrawing ${amount} ${crypto.symbol} - Instant: ${isInstant}`)
    // Ici vous pouvez ajouter la logique pour traiter le retrait
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Asset</TableHead>
            <TableHead className="w-[150px]">Total Vault</TableHead>
            <TableHead>Total Borrowed</TableHead>
            <TableHead className="text-right">Your Share</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaultData.map((vault) => (
            <TableRow
              key={vault.asset}
              className={
                vault.asset === "ETH" ? "bg-orange-100/50 hover:bg-orange-200/50 dark:bg-orange-500/10 dark:hover:bg-orange-500/20" :
                  vault.asset === "SOL" ? "bg-purple-100/50 hover:bg-purple-200/50 dark:bg-purple-500/10 dark:hover:bg-purple-500/20" :
                    "bg-blue-100/50 hover:bg-blue-200/50 dark:bg-blue-500/10 dark:hover:bg-blue-500/20"
              }
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image
                    src={vault.image}
                    alt={vault.asset}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{vault.asset}</span>
                    <span className="text-xs text-muted-foreground">{vault.symbol}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{vault.totalVault}</TableCell>
              <TableCell>{vault.totalBorrowed}</TableCell>
              <TableCell className="text-right text-muted-foreground">{vault.userShare}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <DepositDialog
                    trigger={
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 text-secondary-foreground"
                      >
                        +
                      </Button>
                    }
                    preselectedCrypto={vault}
                    onDeposit={handleDeposit}
                  />

                  <WithdrawDialog
                    trigger={
                      <Button
                        size="sm"
                        className="w-8 h-8 p-0 bg-secondary-background text-secondary-foreground"
                      >
                        -
                      </Button>
                    }
                    preselectedCrypto={vault}
                    onWithdraw={handleWithdraw}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
