import { create } from "mobx-persist"
import FirebaseStore from './FirebaseStore'

export const hydrate = create({
  storage: localStorage,
  jsonify: true
})

export default class RootStore {
  public firebaseStore: FirebaseStore

  constructor() {
    this.firebaseStore = new FirebaseStore(this)
    hydrate("firebase", this.firebaseStore)
  }

  async hydrateFirebaseStore() {
    await hydrate("firebase", this.firebaseStore)
  }
}