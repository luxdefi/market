import { NextPage } from 'next'
import { Text, Flex, Box } from '../../components/primitives'
import Layout from 'components/Layout'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { TabsList, TabsTrigger, TabsContent } from 'components/primitives/Tab'
import * as Tabs from '@radix-ui/react-tabs'
import { useUserCollections } from '@reservoir0x/reservoir-kit-ui'
import { useMounted } from '../../hooks'
import { TokenTable } from 'components/portfolio/TokenTable'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { MobileTokenFilters } from 'components/common/MobileTokenFilters'
import { TokenFilters } from 'components/common/TokenFilters'
import { FilterButton } from 'components/common/FilterButton'
import { ListingsTable } from 'components/portfolio/ListingsTable'
import { OffersTable } from 'components/portfolio/OffersTable'
import { CollectionsTable } from 'components/portfolio/CollectionsTable'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COLLECTION_SET_ID, COMMUNITY } from 'pages/_app'

import IFrame from 'react-iframe'

const GenesisPage: NextPage = () => {
  const { address, isConnected } = useAccount()
  const isSmallDevice = useMediaQuery({ maxWidth: 905 })
  const isMounted = useMounted()
  const [IFrameLoaded, setIFrameLoaded] = useState(false);

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Flex
        direction="column"
        css={{
          position: "absolute",
          top: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          marginTop: "81px"
        }}
      >
      <IFrame url="https://lux.town"
        onLoad={()=> {setIFrameLoaded(true)}}
        overflow="hidden"
        width="100%"
        height="100%"
        id="luxtown"
        className={IFrameLoaded ? 'iframe-loaded' : 'iframe-loading' }
      />
      </Flex>
    </Layout>
  )
}

export default GenesisPage
