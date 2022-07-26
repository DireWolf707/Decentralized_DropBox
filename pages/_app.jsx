import "../styles/globals.css"
import Header from "../components/ui/Header"
import { MoralisProvider } from "react-moralis"
import MoralisAuthCheck from "../components/auth/MoralisAuthCheck"
import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-zinc-800 text-white">
      <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_SERVER_URL} appId={process.env.NEXT_PUBLIC_APP_ID}>
        <Header />
        {Component.auth ? (
          <NotificationProvider>
            <MoralisAuthCheck>
              <Component {...pageProps} />
            </MoralisAuthCheck>
          </NotificationProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </MoralisProvider>
    </div>
  )
}

export default MyApp
