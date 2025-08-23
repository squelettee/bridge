import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import Image from "next/image"
import { useState } from "react"

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
  const [selectedCrypto, setSelectedCrypto] = useState<typeof vaultData[0] | null>(null)

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
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        onClick={() => setSelectedCrypto(vault)}
                        size="sm"
                        className="w-8 h-8 p-0 bg-green-600 hover:bg-green-700 text-white"
                      >
                        +
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-background h-1/2">
                      <div className="mx-auto w-[400px]">
                        <DrawerHeader>
                          <DrawerTitle>Deposit {selectedCrypto?.symbol}</DrawerTitle>
                          <DrawerDescription>
                            Add {selectedCrypto?.symbol} to the vault and start earning points
                          </DrawerDescription>
                          <div className="mt-2 text-xs text-orange-600">
                            Please note: Withdrawals take 7 days to process.
                          </div>
                        </DrawerHeader>
                        <div className="px-4 py-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Vault</p>
                              <p className="font-medium text-foreground">{selectedCrypto?.totalVault}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Points Earned</p>
                              <p className="font-medium text-green-600 dark:text-green-400">{selectedCrypto?.pointsPerDeposit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Min Deposit</p>
                              <p className="font-medium text-foreground">{selectedCrypto?.minDeposit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Max Deposit</p>
                              <p className="font-medium text-foreground">{selectedCrypto?.maxDeposit}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Amount to deposit</label>
                            <input
                              type="number"
                              placeholder={`Enter amount in ${selectedCrypto?.asset}`}
                              className="w-full p-2 border rounded-md bg-background"
                            />
                          </div>
                        </div>
                        <DrawerFooter className="grid grid-cols-2">
                          <Button variant="noShadow" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white">
                            Confirm Deposit
                          </Button>
                          <DrawerClose asChild>
                            <Button
                              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                              variant="noShadow"
                            >
                              Cancel
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>

                  <Button
                    size="sm"
                    className="w-8 h-8 p-0 bg-red-600 hover:bg-red-700 text-white "
                  >
                    -
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
