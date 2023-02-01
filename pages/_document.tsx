import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { getCssText } from '../stitches.config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-M5131VBRN3"></script>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M5131VBRN3');
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1192795114810136');
            fbq('track', 'PageView');
            window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
            heap.load("2120523489");
          `,
          }}
          />
        </Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="blockhain, crypto, nft, ethereum, protocol, real world assets, RWAs" />
        <meta name="facebook-domain-verification" content="2oe8vdr5jorny6ifjtixughdx1lnrr" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <title>LUX | DeFi credit card, blockchain, bridge, exchange and wallet.</title>
        <meta
          name="description"
          content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet."
        />
        <meta name="keywords" content="Blockchain, Ethereum, Crypto DeFI, NFT, API, Protocol, Real World Assets, RWAs" />

        {/* Twitter */}
        {/* The optimal size is 1200 x 630 (1.91:1 ratio). */}
        <meta name="twitter:image" content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet."
        />
        <meta
          name="twitter:description"
          content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet."
        />
        <meta name="twitter:site" content="@luxdefi" />

        {/* OG - https://ogp.me/ */}
        {/* https://www.opengraph.xyz/ */}
        <meta
          name="og:title"
          content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet."
        />
        <meta property="og:type" content="website" />
        <meta property="og:determiner" content="the" />
        <meta property="og:locale" content="en" />
        <meta
          property="og:description"
          content="LUX is a DeFi credit card, blockchain, bridge, exchange and wallet."
        />
        {/* The optimal size is 1200 x 630 (1.91:1 ratio). */}
        {/* <meta property="og:image" content={OG_IMAGE} /> */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta property="og:image:alt" content="LUX Banner" />

        {/* LUX Meta Tags: https://docs.reservoir.tools/docs/reservoir-meta-tags */}
        <meta property="reservoir:title" content="LUX" />
        <meta property="reservoir:icon" content="/source-icon.png" />
        <meta
          property="reservoir:token-url-mainnet"
          content="/collection/ethereum/${contract}/${tokenId}"
        />
        <meta
          property="reservoir:token-url-goerli"
          content="/collection/goerli/${contract}/${tokenId}"
        />
        <meta
          property="reservoir:token-url-polygon"
          content="/collection/polygon/${contract}/${tokenId}"
        />
        <body>
          <Main />
          <NextScript />
        </body>
        <noscript><img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=1192795114810136&ev=PageView&noscript=1"/></noscript>
      </Html>
    )
  }
}

export default MyDocument
