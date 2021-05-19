import { create } from "mobx-persist"
import FirebaseStore from './FirebaseStore'
import FermentStore from './FermentStore'

export const hydrate = create({
  storage: localStorage,
  jsonify: true
})

export default class RootStore {
  public firebaseStore: FirebaseStore
  public fermentStore: FermentStore

  constructor() {
    this.firebaseStore = new FirebaseStore(this)
    this.fermentStore = new FermentStore(this)
    
    hydrate("firebase", this.firebaseStore)
  }

  async hydrateFirebaseStore() {
    await hydrate("firebase", this.firebaseStore)
  }
}