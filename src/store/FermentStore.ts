import { action, computed, flow, makeObservable, observable } from "mobx";
import { format, add } from "date-fns";
import {
  createFerment,
  updateFerment,
  deleteFerment,
  getAllFerments,
} from "../api/ferments";
import { INewFerment, IFerment, EFrequency } from "../types/ferment";

import RootStore from "./RootStore";

export default class FermentStore {
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  // <--- Observables --->

  @observable showFermentForm = false;
  @observable ferments = Array<IFerment>();
  @observable activeFerment: IFerment | undefined;

  // <--- Actions --->

  @action toggleFermentForm() {
    this.showFermentForm = !this.showFermentForm;
  }

  @action setActiveFerment(fermentId: string) {
    this.activeFerment = this.ferments.find(
      (ferment) => ferment._id === fermentId
    );
  }

  @action clearActiveFerment() {
    this.activeFerment = undefined;
  }

  // <--- Compute --->

  @computed get lastFed() {
    if (this.activeFerment) {
      return format(new Date(this.activeFerment.lastFed), "EEEE, do MMMM");
    }

    return "-";
  }

  @computed get nextFeed() {
    if (this.activeFerment) {
      let maths = {};

      switch (this.activeFerment.frequency) {
        case EFrequency.daily:
          maths = { days: 1 };
          break;
        case EFrequency.twoDays:
          maths = { days: 2 };
          break;
        case EFrequency.threeDays:
          maths = { days: 3 };
          break;
        case EFrequency.weekly:
          maths = { weeks: 1 };
          break;
        case EFrequency.fortnightly:
          maths = { weeks: 2 };
          break;
        case EFrequency.monthly:
          maths = { months: 1 };
          break;
      }

      const date = add(new Date(this.activeFerment.lastFed), maths);
      return format(date, "EEEE, do MMMM");
    }

    return "-";
  }

  @computed get dob() {
    if (this.activeFerment) {
      return format(new Date(this.activeFerment.dob), "EEEE, do MMMM");
    }
  }

  // <--- Flows --->
  getAllFerments = flow(function* (this: FermentStore) {
    try {
      const { data } = yield getAllFerments();
      this.ferments = data.ferments;
    } catch (err) {
      throw err;
    }
  });

  createFerment = flow(function* (this: FermentStore, ferment: INewFerment) {
    try {
      const { data } = yield createFerment(ferment);
      this.activeFerment = data.ferment;
      this.ferments = [...this.ferments, data.ferment];
      this.toggleFermentForm();
    } catch (err) {
      throw err;
    }
  });

  updateFerment = flow(function* (this: FermentStore, ferment: INewFerment) {
    try {
      if (this.activeFerment) {
        const { data } = yield updateFerment(this.activeFerment._id, ferment);

        if (data.status === "success") {
          this.activeFerment = data.ferment

          const index = this.ferments.findIndex(item => item._id === data.ferment._id)
          this.ferments[index] = data.ferment

          this.toggleFermentForm()
        }
      }
    } catch (err) {
      throw err;
    }
  });

  deleteFerment = flow(function* (this: FermentStore, fermentId: string) {
    try {
      this.ferments = this.ferments.filter(
        (ferment) => ferment._id !== fermentId
      );

      yield deleteFerment(fermentId);
    } catch (err) {
      throw err;
    }
  });
}
