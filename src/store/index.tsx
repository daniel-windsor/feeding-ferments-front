import React, { createContext, useContext, useState } from 'react'

import RootStore from "./RootStore"
import FirebaseStore from "./FirebaseStore"
import FermentStore from "./FermentStore"

export const rootStore = new RootStore()

const {
  firebaseStore,
  fermentStore
} = rootStore

const firebaseStoreContext = createContext<null | FirebaseStore>(null)
const fermentStoreContext = createContext<null | FermentStore>(null)

interface ProviderProps { children: React.ReactNode }

export const FirebaseStoreProvider = ({ children }: ProviderProps) => {
  const [store] = useState(firebaseStore)
  return (
    <firebaseStoreContext.Provider value={store}>
      {children}
    </firebaseStoreContext.Provider>
  )
}

export const FermentStoreProvider = ({ children }: ProviderProps) => {
  const [store] = useState(fermentStore)
  return (
    <fermentStoreContext.Provider value={store}>
      {children}
    </fermentStoreContext.Provider>
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

export const useFermentStore = () => {
  const store = useContext(fermentStoreContext)
  if (!store) throw providerError("Ferment Store");
  return store
}