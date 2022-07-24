import { motion } from "framer-motion"

const Loading = () => {
  const Pvariants = {
    animate: {
      transition: {
        staggerChildren: 0.1, // modify to alter wave pattern
      },
    },
  }

  const Cvariants = {
    animate: {
      scaleY: [1.2, 3, 1.2],
      transition: {
        repeat: Infinity,
        duration: 0.7, // modify to alter animation speed
        repeatDelay: 1.05,
        // modify to control loop delay (must change in case of change in number of bars or stagger speed)
      },
    },
  }

  return (
    <motion.div variants={Pvariants} animate="animate" className="flex space-x-[3px]">
      {[...Array(12)].map((_, i) => (
        <motion.div variants={Cvariants} key={i} className="h-[40px] w-[15px] bg-white"></motion.div>
      ))}
    </motion.div>
  )
}

export default Loading
