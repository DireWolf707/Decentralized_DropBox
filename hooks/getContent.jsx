import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const getContent = () => {
  const dispatch = useNotification()
  const { fetch, isLoading, isFetching, data } = useMoralisCloudFunction("getContent", {}, { autoFetch: false })

  const fetchContent = async (folderId) => {
    return await fetch({
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Please reload this page",
          title: "Something went wrong!",
          position: "topR",
        }),
      params: { folderId },
    })
  }

  return { fetchContent, data, loading: isLoading || isFetching }
}
