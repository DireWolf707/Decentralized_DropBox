import { useMoralis } from "react-moralis"
import SignUp from "../../components/forms/Signup"
import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Root = () => {
  const { isAuthenticated, user, Moralis, authenticate } = useMoralis()
  useEffect(() => {
    Moralis.onAccountChanged(async (account) => {
      if (account) {
        await authenticate()
      }
    })
  }, [])
  if (!isAuthenticated) return <div>connect to metamask</div>
  if (!user.attributes.storageAPI) return <SignUp />
  return <div>registered user</div>
}

export default Root
