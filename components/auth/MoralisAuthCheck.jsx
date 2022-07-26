import { useMoralis } from "react-moralis"
import SignUp from "../forms/Signup"
import { useEffect } from "react"
import ConnectMetamask from "../ui/ConnectMetamask"
import Loading from "../animation/Loading"
import { useNotification } from "web3uikit"

const MoralisAuthCheck = ({ children }) => {
  const dispatch = useNotification()
  const { isUnauthenticated, user, Moralis, logout, isInitializing, isLoggingOut, isWeb3Enabled } = useMoralis()

  useEffect(() => {
    const unsub = Moralis.onAccountChanged(async (account) => {
      if (account) {
        await logout()
      }
      dispatch({
        type: "info",
        message: "Please connect wallet again!",
        title: "Account Changed !",
        position: "topR",
      })
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
