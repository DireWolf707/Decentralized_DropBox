import { useMoralis } from "react-moralis"
import SignUp from "../forms/Signup"
import { useEffect } from "react"
import ConnectMetamask from "../ui/ConnectMetamask"

const MoralisAuthCheck = ({ children }) => {
  const { isWeb3Enabled, isUnauthenticated, user, Moralis, logout } = useMoralis()
  useEffect(() => {
    const unsub = Moralis.onAccountChanged(async (account) => {
      if (account) await logout()
    })
    return unsub
  }, [])
  if (!isWeb3Enabled || isUnauthenticated) return <ConnectMetamask />
  if (!user.attributes.storageAPI) return <SignUp />
  return children
}

export default MoralisAuthCheck
