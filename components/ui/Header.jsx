import { ConnectButton } from "web3uikit"
import Link from "next/link"

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-4 mx-2 border-b-2 ">
      <Link href='/'>
        <button className="text-xl font-bold">Title</button>
      </Link>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  )
}

export default Header
