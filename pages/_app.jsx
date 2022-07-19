import "../styles/globals.css"
import Header from "../components/ui/Header"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
        <Header />
        <Component {...pageProps} />
      </MoralisProvider>
    </div>
  )
}

export default MyApp
