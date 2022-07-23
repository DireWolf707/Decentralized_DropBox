import { useMoralisCloudFunction } from "react-moralis"

export const getContent = () => {
  const { fetch, isLoading, isFetching, data } = useMoralisCloudFunction("getContent", {}, { autoFetch: false })

  const fetchContent = async (folderId) => {
    await fetch({
      onSuccess: (data) => console.log("content fetched"),
      onError: (err) => console.log(err),
      params: { folderId },
    })
  }

  return { fetchContent, data, loading: isLoading || isFetching }
}
