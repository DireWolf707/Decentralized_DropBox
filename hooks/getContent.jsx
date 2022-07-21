import { useMoralisCloudFunction, useMoralis } from "react-moralis"

export const getContent = () => {
  const { user } = useMoralis()
  const { fetch, isLoading, isFetching, data } = useMoralisCloudFunction("getContent", {}, { autoFetch: false })

  const fetchContent = async (folderId) => {
    if (!folderId) folderId = user.attributes.rootFolderId

    await fetch({
      onSuccess: (data) => console.log("content fetched"),
      onError: (err) => console.log(err),
      params: { folderId },
    })
  }

  return { fetchContent, data, loading: isLoading || isFetching }
}
