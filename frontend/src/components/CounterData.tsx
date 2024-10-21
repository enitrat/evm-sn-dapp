import { useState, useEffect } from 'react'
import { Abi, useReadContract } from '@starknet-react/core'
import { CairoCustomEnum } from 'starknet'
import { ABI } from '../abis/abi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { AlertCircle, Hash, Users, RefreshCw, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { motion, AnimatePresence } from "framer-motion"

const CONTRACT_ADDRESS = '0x00193afab3e569d5ef5c45794c144075dd0053229fbcf4cf8719ae06e50dbd9d'

const DataItem = ({ icon: Icon, title, value }) => (
  <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
    <Icon className="h-6 w-6 text-primary" />
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
)

export default function CounterData() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { data: counterData, refetch: refetchCounter } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'get_counter',
  })

  const { data: lastCallerData, refetch: refetchLastCaller } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'get_last_caller',
  })

  const { data: starknetCallersData, refetch: refetchStarknetCallers } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'get_n_callers_by_type',
    args: [new CairoCustomEnum({ Starknet: {} })],
  })

  const { data: kakarotCallersData, refetch: refetchKakarotCallers } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'get_n_callers_by_type',
    args: [new CairoCustomEnum({ Kakarot: {} })],
  })

  const refetchAll = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([
        refetchCounter(),
        refetchLastCaller(),
        refetchStarknetCallers(),
        refetchKakarotCallers()
      ])
    } catch (error) {
      console.error('Error refetching data:', error)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refetchAll()
  }, [])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Counter Smart Contract Data</CardTitle>
        <CardDescription>Live data from the counter contract</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-24 w-full" />
              ))}
            </>
          ) : (
            <>
              <DataItem
                icon={Hash}
                title="Current Count"
                value={counterData !== undefined ? counterData.toString() : 'N/A'}
              />
              <DataItem
                icon={User}
                title="Last Caller"
                value={lastCallerData !== undefined ? `0x${lastCallerData.toString(16).slice(0, 6)}...` : 'N/A'}
              />
              <DataItem
                icon={Users}
                title="Starknet Callers"
                value={starknetCallersData !== undefined ? starknetCallersData.toString() : 'N/A'}
              />
              <DataItem
                icon={Users}
                title="Kakarot Callers"
                value={kakarotCallersData !== undefined ? kakarotCallersData.toString() : 'N/A'}
              />
            </>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            onClick={refetchAll}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
