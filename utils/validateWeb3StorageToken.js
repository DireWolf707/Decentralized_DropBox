import { Web3Storage } from "web3.storage"

export const validateToken = async (token) => {
  const web3storage = new Web3Storage({ token })

  try {
    for await (const _ of web3storage.list({ maxResults: 1 })) {
      // any non-error response means the token is legit
      break
    }
    return true
  } catch (e) {
    // only return false for auth-related errors
    // if (e.message.includes("401") || e.message.includes("403")) {
    //   return false
    // }
    // propagate non-auth errors
    // throw e
    return false
  }
}
