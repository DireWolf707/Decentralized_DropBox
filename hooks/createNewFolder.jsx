import { useMoralisCloudFunction, useMoralis } from "react-moralis"

export const createNewFolder = () => {
  const { user } = useMoralis()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("createNewFolder", {}, { autoFetch: false })

  const addFolder = async (name, parentId) => {
    if (!parentId) parentId = user.attributes.rootFolderId
    await fetch({
      onSuccess: () => console.log("folder added"),
      onError: (err) => console.log(err),
      params: { name, parentId },
    })
  }

  return { addFolder, loading: isLoading || isFetching }
}
