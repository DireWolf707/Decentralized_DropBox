import { StarIcon as StarIconOutline } from "@heroicons/react/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/solid"
import { useState } from "react"
import { markFileAsFav } from "../../../hooks/markFileAsFav"

const Favourite = ({ row }) => {
  // return blank string if folder
  if (!row.type) return ""

  const { newFavMark } = markFileAsFav()
  const [marked, setMarked] = useState(row.favourite)

  const toggleFav = async () => {
    const newMarked = await newFavMark(row._id)
    setMarked(newMarked)
  }

  return marked ? (
    <StarIconSolid onClick={toggleFav} className="h-5 w-5" role="button" />
  ) : (
    <StarIconOutline onClick={toggleFav} className="h-5 w-5" role="button" />
  )
}

export default Favourite
