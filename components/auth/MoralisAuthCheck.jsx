import { useMoralis } from "react-moralis"
import SignUp from "../forms/Signup"
import { useEffect } from "react"

const MoralisAuthCheck = ({ children }) => {
  const { isAuthenticated, user, Moralis, logout } = useMoralis()
  useEffect(() => {
    const unsub = Moralis.onAccountChanged(async (account) => {
      if (account) await logout()
    })
    return unsub
  }, [])
  if (!isAuthenticated) return <div>connect to metamask</div>
  if (!user.attributes.storageAPI) return <SignUp />
  return children
}

export default MoralisAuthCheck
