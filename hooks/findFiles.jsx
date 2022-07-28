import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const findFiles = () => {
  const dispatch = useNotification()
  const { fetch, data, isLoading, isFetching } = useMoralisCloudFunction("findFiles", {}, { autoFetch: false })

  const find = async (fileName) => {
    await fetch({
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Please reload this page",
          title: "Something went wrong!",
          position: "topR",
        }),
      params: { fileName },
    })
  }

  return { find, data, loading: isLoading || isFetching }
}
