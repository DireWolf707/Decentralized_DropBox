import "../styles/globals.css"
import Header from "../components/ui/Header"
import { MoralisProvider } from "react-moralis"
import MoralisAuthCheck from "../components/auth/MoralisAuthCheck"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
        <Header />
        {Component.auth ? (
          <MoralisAuthCheck>
            <Component {...pageProps} />
          </MoralisAuthCheck>
        ) : (
          <Component {...pageProps} />
        )}
      </MoralisProvider>
    </div>
  )
}

export default MyApp
