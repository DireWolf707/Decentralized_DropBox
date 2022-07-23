import { useMoralisCloudFunction } from "react-moralis"

export const createNewFolder = () => {
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("createNewFolder", {}, { autoFetch: false })

  const addFolder = async (name, parentId) => {
    await fetch({
      onSuccess: () => console.log("folder added"),
      onError: (err) => console.log(err),
      params: { name, parentId },
    })
  }

  return { addFolder, loading: isLoading || isFetching }
}
