import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useEffect, useState } from "react"

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

interface DepositDialogProps {
  trigger?: React.ReactNode
  preselectedCrypto?: typeof vaultData[0]
  onDeposit?: (crypto: typeof vaultData[0], amount: string) => void
}

export default function DepositDialog({ trigger, preselectedCrypto, onDeposit }: DepositDialogProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<typeof vaultData[0] | null>(preselectedCrypto || null)
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Si une crypto est présélectionnée, on la définit au montage du composant
  useEffect(() => {
    if (preselectedCrypto) {
      setSelectedCrypto(preselectedCrypto)
    }
  }, [preselectedCrypto])

  const handleDeposit = () => {
    if (selectedCrypto && amount && onDeposit) {
      onDeposit(selectedCrypto, amount)
      setIsOpen(false)
      setAmount("")
      setSelectedCrypto(preselectedCrypto || null)
    }
  }

  const handleCryptoSelect = (crypto: typeof vaultData[0]) => {
    setSelectedCrypto(crypto)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAmount("")
    setSelectedCrypto(preselectedCrypto || null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Deposit</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Crypto to Deposit</DialogTitle>
          <DialogDescription>
            Select a cryptocurrency to deposit into the vault
          </DialogDescription>
        </DialogHeader>

        {!selectedCrypto ? (
          <div className="py-4 space-y-3">
            {vaultData.map((crypto) => (
              <div
                key={crypto.symbol}
                onClick={() => handleCryptoSelect(crypto)}
                className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
              >
                <Image
                  src={crypto.image}
                  alt={crypto.asset}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{crypto.asset}</span>
                  <span className="text-xs text-muted-foreground">{crypto.symbol}</span>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-sm font-medium">{crypto.pointsPerDeposit}</div>
                  <div className="text-xs text-muted-foreground">{crypto.minDeposit} - {crypto.maxDeposit}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/20 p-3 rounded-md">
              Please note: Withdrawals take 7 days to process.
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border bg-accent/50">
              <Image
                src={selectedCrypto.image}
                alt={selectedCrypto.asset}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-medium">{selectedCrypto.asset}</span>
                <span className="text-sm text-muted-foreground ml-2">({selectedCrypto.symbol})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Vault</p>
                <p className="font-medium text-foreground">{selectedCrypto.totalVault}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Points Earned</p>
                <p className="font-medium text-green-600 dark:text-green-400">{selectedCrypto.pointsPerDeposit}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Min Deposit</p>
                <p className="font-medium text-foreground">{selectedCrypto.minDeposit}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Deposit</p>
                <p className="font-medium text-foreground">{selectedCrypto.maxDeposit}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to deposit</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount in ${selectedCrypto.symbol}`}
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {selectedCrypto && (
            <>
              <Button
                onClick={handleDeposit}
                disabled={!amount}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white"
              >
                Confirm Deposit
              </Button>
              <Button
                variant="neutral"
                onClick={() => {
                  setSelectedCrypto(null)
                  setAmount("")
                }}
              >
                Back
              </Button>
            </>
          )}
          <Button
            variant="neutral"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
