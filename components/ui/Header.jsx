import { ConnectButton } from "web3uikit"
import { motion } from "framer-motion"
import Link from "next/link"
import { useMoralis } from "react-moralis"

const Header = () => {
  const { isAuthenticated } = useMoralis()
  return (
    <nav className="flex justify-between items-center p-4 mx-2 border-b-2 bg-zinc-900 rounded-b-lg">
      <Link href="/">
        <button className="text-2xl font-bold hover:scale-105 duration-300">
          <span className="bg-gradient-to-r from-blue-500 to-orange-400 bg-clip-text text-transparent">Decentralized Dropbox</span>
        </button>
      </Link>

      <div className="flex items-center space-x-1">
        {isAuthenticated && (
          <Link href="/MyFiles">
            <button className="shadow-inner drop-shadow shadow-slate-200 border rounded-lg p-2 hover:scale-110 duration-300">
              My Files
            </button>
          </Link>
        )}
        <div className="relative">
          <motion.div
            animate={{
              scale: [1.05, 1, 1.02],
              transition: { repeat: Infinity, duration: 2, repeatType: "mirror" },
            }}
            className="absolute inset-x-3 -inset-y-1 blur-sm rounded-2xl bg-gradient-to-br from-pink-600 to bg-purple-600"
          ></motion.div>
          <div className="relative">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
