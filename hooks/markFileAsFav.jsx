import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const markFileAsFav = () => {
  const dispatch = useNotification()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("markFileAsFav", {}, { autoFetch: false })

  const newFavMark = async (fileId) => {
    return await fetch({
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Something went wrong",
          title: "Error !",
          position: "topR",
        }),
      params: { fileId },
    })
  }

  return { newFavMark, loading: isLoading || isFetching }
}
