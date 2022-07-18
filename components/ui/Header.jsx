import { ConnectButton } from "web3uikit"
import { motion } from "framer-motion"
import Link from "next/link"

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-4 mx-4 border-b-2 ">
      <Link href="/">
        <button className="text-xl font-bold">Title</button>
      </Link>

      <div>
        <div className="relative">
          <motion.div
            animate={{
              scale: [1.05, 1, 1.05],
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
