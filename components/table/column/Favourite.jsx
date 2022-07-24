import { StarIcon as StarIconOutline } from "@heroicons/react/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/solid"
import { useState } from "react"
import { markFileAsFav } from "../../../hooks/markFileAsFav"

const Favourite = ({ row }) => {
  if (!row.type) return ""

  const { fetch } = markFileAsFav()
  const [marked, setMarked] = useState(row.favourite)

  const toggleFav = async () => {
    try {
      const newMarked = await fetch({ params: { fileId: row._id } })
      setMarked(newMarked)
    } catch (err) {
      console.log(err)
    }
  }

  return marked ? (
    <StarIconSolid onClick={toggleFav} className="h-5 w-5" role="button" />
  ) : (
    <StarIconOutline onClick={toggleFav} className="h-5 w-5" role="button" />
  )
}

export default Favourite
