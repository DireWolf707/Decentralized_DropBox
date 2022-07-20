import { motion } from "framer-motion"

const Border = ({ children, padding }) => {
  const borderVariantsX = {
    animate: {
      scaleX: [0, 1, 1],
      opacity: [1, 1, 0],
      transition: { repeat: Infinity, duration: 1.7, times: [0, 0.5, 1] },
    },
  }
  const borderVariantsY = {
    animate: {
      scaleY: [0, 1, 1],
      opacity: [1, 1, 0],
      transition: { repeat: Infinity, duration: 1.7, times: [0, 0.5, 1] },
    },
  }
  return (
    <div className={`relative ${padding}`}>
      {children}
      <motion.div
        variants={borderVariantsX}
        animate="animate"
        className="absolute origin-left rounded-full bg-blue-600 inset-x-0 top-0 h-1"
      ></motion.div>
      <motion.div
        variants={borderVariantsY}
        animate="animate"
        className="absolute origin-top rounded-full bg-blue-600 inset-y-0 right-0 w-1"
      ></motion.div>
      <motion.div
        variants={borderVariantsX}
        animate="animate"
        className="absolute origin-right rounded-full bg-blue-600 inset-x-0 bottom-0 h-1"
      ></motion.div>
      <motion.div
        variants={borderVariantsY}
        animate="animate"
        className="absolute origin-bottom rounded-full bg-blue-600 inset-y-0 left-0 w-1"
      ></motion.div>
    </div>
  )
}

export default Border
