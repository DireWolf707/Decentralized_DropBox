import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const markAsHidden = () => {
  const dispatch = useNotification()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("markAsHidden", {}, { autoFetch: false })

  const changeHidden = async (id, type) => {
    return await fetch({
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Something went wrong",
          title: "Error !",
          position: "topR",
        }),
      params: { id, type: type ? "File" : "Folder" },
    })
  }

  return { changeHidden, loading: isLoading || isFetching }
}
