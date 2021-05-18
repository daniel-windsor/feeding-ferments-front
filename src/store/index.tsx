import React, { createContext, useContext, useState } from 'react'

import RootStore from "./RootStore"
import FirebaseStore from "./FirebaseStore"

export const rootStore = new RootStore()

const {
  firebaseStore
} = rootStore

const firebaseStoreContext = createContext<null | FirebaseStore>(null)

interface ProviderProps { children: React.ReactNode }

export const FirebaseStoreProvider = ({ children }: ProviderProps) => {
  const [store] = useState(firebaseStore)
  return (
    <firebaseStoreContext.Provider value={store}>
      {children}
    </firebaseStoreContext.Provider>
  )
}

const providerError = (storeName: string): never => {
  throw new Error(`You have forgotten to use ${storeName} provider`)
}

export const useFirebaseStore = () => {
  const store = useContext(firebaseStoreContext)
  if (!store) throw providerError("Firebase Store");
  return store
}