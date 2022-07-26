import { useMoralis } from "react-moralis"
import SignUp from "../forms/Signup"
import { useEffect } from "react"
import ConnectMetamask from "../ui/ConnectMetamask"
import Loading from "../animation/Loading"

const MoralisAuthCheck = ({ children }) => {
  const { isUnauthenticated, user, Moralis, logout, isInitializing, isLoggingOut, isWeb3Enabled } = useMoralis()

  useEffect(() => {
    const unsub = Moralis.onAccountChanged(async (account) => {
      if (account) await logout()
    })
    return unsub
  }, [])

  if (isInitializing || isLoggingOut)
    return (
      <div className="absolute z-10 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]">
        <Loading />
      </div>
    )
  if (isUnauthenticated || !isWeb3Enabled || !user) return <ConnectMetamask />
  if (!user.attributes.storageAPI) return <SignUp />
  return children
}

export default MoralisAuthCheck
