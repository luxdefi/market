import { FC, useEffect, useState } from 'react'

import 'fonts/inter.css'
import '@rainbow-me/rainbowkit/styles.css'
import "style/iframe.css"

import type { AppContext, AppProps } from 'next/app'
import { default as NextApp } from 'next/app'
import { ThemeProvider, useTheme } from 'next-themes'
import { darkTheme, globalReset } from 'stitches.config'
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import * as Tooltip from '@radix-ui/react-tooltip'

import {
  ReservoirKitProvider,
  darkTheme as reservoirDarkTheme,
  lightTheme as reservoirLightTheme,
  ReservoirKitTheme,
} from '@reservoir0x/reservoir-kit-ui'
import { HotkeysProvider } from 'react-hotkeys-hook'

import ToastContextProvider from 'context/ToastContextProvider'
import supportedChains from 'utils/chains'
import { useMarketplaceChain } from 'hooks'
import ChainContextProvider from 'context/ChainContextProvider'
import AnalyticsProvider from 'components/AnalyticsProvider'

export const NORMALIZE_ROYALTIES = process.env.NEXT_PUBLIC_NORMALIZE_ROYALTIES
  ? process.env.NEXT_PUBLIC_NORMALIZE_ROYALTIES === 'true'
  : false

export const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID
  ? process.env.NEXT_PUBLIC_COLLECTION_SET_ID
  : undefined

export const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
  ? process.env.NEXT_PUBLIC_COMMUNITY
  : undefined

const { chains, provider } = configureChains(supportedChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || '' }),
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: 'LUX',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const reservoirKitThemeOverrides = {
  headlineFont: 'Inter',
  font: 'Inter',
  fontFamily: 'Inter',
  primaryColor: '#444',
  primaryHoverColor: 'white',
}

function AppWrapper(props: AppProps & { baseUrl: string }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ChainContextProvider>
        <AnalyticsProvider>
          <MyApp {...props} />
        </AnalyticsProvider>
      </ChainContextProvider>
    </WagmiConfig>
  )
}

const MyApp: React.FC<
  AppProps &
  { baseUrl: string
}> = ({
  Component,
  pageProps,
  baseUrl,
}) => {

  globalReset()

      // Note, this just manages theme selection (Does not implement any theming itself.)
  const { theme } = useTheme()
  const marketplaceChain = useMarketplaceChain()
  const [reservoirKitTheme, setReservoirKitTheme] = useState<
    ReservoirKitTheme | undefined
  >()
  const [rainbowKitTheme, setRainbowKitTheme] = useState<
    | ReturnType<typeof rainbowDarkTheme>
    | ReturnType<typeof rainbowLightTheme>
    | undefined
  >()

  useEffect(() => {
    if (theme == 'dark') {
      setReservoirKitTheme(reservoirDarkTheme(reservoirKitThemeOverrides))
      setRainbowKitTheme(
        Object.assign(rainbowDarkTheme({
          accentColor: 'white',
          accentColorForeground: '#111',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        }), {
        colors: {
          actionButtonSecondaryBackground: '#000',
          actionButtonBorder: '#111',
          closeButton: 'black',
          closeButtonBackground: 'white',
          modalBackground: '#111',
          modalBorder: '#111',
        }
      }))
    } else {
      setReservoirKitTheme(reservoirLightTheme(reservoirKitThemeOverrides))
      setRainbowKitTheme(
        Object.assign({},
          rainbowLightTheme({
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
          }),
          {
            colors: {
              actionButtonSecondaryBackground: '#000',
              actionButtonBorder: '#111',
              closeButton: 'black',
              closeButtonBackground: 'white',
              modalBackground: '#111',
              modalBorder: '#111',
            }
          }
        )
      )
    }
  }, [theme])

  const FunctionalComponent = Component as FC

  return (
    <HotkeysProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        value={{
          dark: darkTheme.className,
          light: 'light',
        }}
      >
      <ReservoirKitProvider
        options={{
          apiBase: `${baseUrl}${marketplaceChain.proxyApi}`,
          apiKey: process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
          // Replace source with your domain
          // source: 'YOUR_DOMAIN',
          normalizeRoyalties: NORMALIZE_ROYALTIES,
        }}
        theme={reservoirKitTheme}
      >
        <Tooltip.Provider>
          <RainbowKitProvider
            chains={chains}
            theme={rainbowKitTheme}
            modalSize="compact"
          >
            <ToastContextProvider>
              <FunctionalComponent {...pageProps} />
            </ToastContextProvider>
          </RainbowKitProvider>
        </Tooltip.Provider>
      </ReservoirKitProvider>
      </ThemeProvider>
    </HotkeysProvider>
  )
}

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(appContext)
  let baseUrl = ''

  if (appContext.ctx.req?.headers.host) {
    const host = appContext.ctx.req?.headers.host
    baseUrl = `${host.includes('localhost') ? 'http' : 'https'}://${host}`
  } else if (process.env.NEXT_PUBLIC_HOST_URL) {
    baseUrl = process.env.NEXT_PUBLIC_HOST_URL || ''
  }
  baseUrl = baseUrl.replace(/\/$/, '')

  return { ...appProps, baseUrl }
}

export default AppWrapper
