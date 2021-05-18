import { action, flow, makeObservable, observable } from "mobx";
import { persist } from "mobx-persist";
import firebase from "firebase/app";
import "firebase/auth";

import RootStore from "./RootStore";

import { register } from "../api/auth";
import { RegisterCredentials, User } from "../types/user";

const firebaseConfig = {
  apiKey: "AIzaSyABFm-gmI9oX9-z9ce9qb-M7FuKQwY29EE",
  authDomain: "feeding-ferments-f32c6.firebaseapp.com",
  databaseURL: "https://feeding-ferments-f32c6.firebaseio.com",
  projectId: "feeding-ferments-f32c6",
  storageBucket: "feeding-ferments-f32c6.appspot.com",
  messagingSenderId: "644133402066",
  appId: "1:644133402066:web:3ada934d244d8f7af7840b",
  measurementId: "G-18TEBB8CBJ",
};

export default class FirebaseStore {
  constructor(public rootStore: RootStore) {
    makeObservable(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth();

      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          this.user = {
            displayName: user.displayName || "user",
            email: user.email || "",
            uid: user.uid,
          };
          console.log("logged in");
        } else {
          console.log("logged out");
        }
      });
    }
  }

  // <--- Observables --->

  @persist("object") @observable public user?: User;

  @observable showAuth = false;
  @observable authType = "";
  @observable showProfile = false;

  // <--- Actions --->

  @action toggleAuth(type?: string) {
    if (type) this.authType = type;
    this.showAuth = !this.showAuth;
  }

  @action setShowProfile(bool: boolean) {
    this.showProfile = bool;
  }

  // <--- Flows --->

  logout = flow(function* (this: FirebaseStore) {
    try {
      yield firebase.auth().signOut();
      this.user = undefined;
    } catch (err) {
      console.log(err);
    }
  });

  register = flow(function* (this: FirebaseStore, values: RegisterCredentials) {
    yield register(values);

    yield firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password);

    this.toggleAuth();

    return;
  });
}
