import { useMoralis } from "react-moralis"
import SignUp from "../../components/forms/Signup"

const Root = () => {
  const { isAuthenticated, user } = useMoralis()
  if (!isAuthenticated) return <div>connect to metamask</div>
  if (!user.attributes.storageAPI) return <SignUp />
  return <div>registered user</div>
}

export default Root
