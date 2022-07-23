import { useMoralisCloudFunction } from "react-moralis"

export const markFileAsFav = () => {
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("markFileAsFav", {}, { autoFetch: false })
  return { fetch, loading: isLoading || isFetching }
}
