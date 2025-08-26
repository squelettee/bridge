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

interface WithdrawDialogProps {
  trigger?: React.ReactNode
  preselectedCrypto?: typeof vaultData[0]
  onWithdraw?: (crypto: typeof vaultData[0], amount: string, isInstant: boolean) => void
}

export default function WithdrawDialog({ trigger, preselectedCrypto, onWithdraw }: WithdrawDialogProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<typeof vaultData[0] | null>(preselectedCrypto || null)
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [withdrawType, setWithdrawType] = useState<"instant" | "standard" | null>(null)

  // Si une crypto est présélectionnée, on la définit au montage du composant
  useEffect(() => {
    if (preselectedCrypto) {
      setSelectedCrypto(preselectedCrypto)
    }
  }, [preselectedCrypto])

  const handleWithdraw = () => {
    if (selectedCrypto && amount && withdrawType && onWithdraw) {
      onWithdraw(selectedCrypto, amount, withdrawType === "instant")
      setIsOpen(false)
      setAmount("")
      setWithdrawType(null)
      setSelectedCrypto(preselectedCrypto || null)
    }
  }

  const handleCryptoSelect = (crypto: typeof vaultData[0]) => {
    setSelectedCrypto(crypto)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAmount("")
    setWithdrawType(null)
    setSelectedCrypto(preselectedCrypto || null)
  }

  const calculateInstantWithdrawAmount = (amount: string) => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return "0"
    return (numAmount * 0.8).toFixed(6) // 20% slashing
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Withdraw</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Crypto to Withdraw</DialogTitle>
          <DialogDescription>
            Select a cryptocurrency to withdraw from the vault
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
                  <div className="text-sm font-medium">Your Share</div>
                  <div className="text-xs text-muted-foreground">{crypto.userShare}</div>
                </div>
              </div>
            ))}
          </div>
        ) : !withdrawType ? (
          <div className="py-4 space-y-4">
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

            <div className="space-y-3">
              <h4 className="font-medium">Choose Withdrawal Type:</h4>
              
              {/* Instant Withdraw Option */}
              <div
                onClick={() => setWithdrawType("instant")}
                className="p-4 border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-orange-700">⚡ Instant Withdraw</span>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">20% Slashing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get your funds immediately, but lose 20% of your deposit as penalty
                </p>
              </div>

              {/* Standard Withdraw Option */}
              <div
                onClick={() => setWithdrawType("standard")}
                className="p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-700">📅 Standard Withdraw</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">7 Days</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wait 7 days for processing, but keep 100% of your deposit
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
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

            {withdrawType === "instant" && (
              <div className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/20 p-3 rounded-md">
                ⚠️ Warning: Instant withdrawal will apply a 20% slashing penalty to your deposit.
              </div>
            )}

            {withdrawType === "standard" && (
              <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md">
                ℹ️ Standard withdrawal will take 7 days to process. No penalties applied.
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount to withdraw</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount in ${selectedCrypto.symbol}`}
                className="w-full p-2 border rounded-md bg-background"
              />
            </div>

            {withdrawType === "instant" && amount && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="text-sm text-orange-700 dark:text-orange-300">
                  <div>You will receive: <span className="font-medium">{calculateInstantWithdrawAmount(amount)} {selectedCrypto.symbol}</span></div>
                  <div className="text-xs">Penalty: {(parseFloat(amount) * 0.2).toFixed(6)} {selectedCrypto.symbol}</div>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {withdrawType && (
            <>
              <Button
                onClick={handleWithdraw}
                disabled={!amount}
                className={`${
                  withdrawType === "instant" 
                    ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600" 
                    : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                } text-white`}
              >
                {withdrawType === "instant" ? "Confirm Instant Withdraw" : "Confirm Standard Withdraw"}
              </Button>
              <Button
                variant="neutral"
                onClick={() => {
                  setWithdrawType(null)
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
