import { createClient, configureChains } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

async function run() {
  const { provider } = configureChains([mainnet], [publicProvider()])
  const client = createClient({ autoConnect: false, provider })

  console.log('✅ Wagmi + Viem 1.x stable')
  console.log('Provider ready:', !!client.provider)
}

run().catch(console.error)
