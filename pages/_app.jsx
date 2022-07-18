import "../styles/globals.css"
import Header from "../components/ui/Header"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <MoralisProvider serverUrl="https://9qzg0dcmaufq.usemoralis.com:2053/server" appId="aN6Q8BnaCI4Vm5Et7FRgNXS24BP2kYYn6eJPcI1u">
        <Header />
        <Component {...pageProps} />
      </MoralisProvider>
    </div>
  )
}

export default MyApp
