import { action, computed, flow, makeObservable, observable } from "mobx";
import { format, add, formatDistanceToNowStrict } from "date-fns";
import { persist } from "mobx-persist";
import {
  createFerment,
  updateFerment,
  deleteFerment,
  getAllFerments,
} from "../api/ferments";
import { INewFerment, IFerment, EFrequency } from "../types/ferment";

import RootStore from "./RootStore";
import {
  createDirection,
  getAllFermentDirections,
  getFermentDirections,
  deleteDirection,
} from "../api/directions";
import { IDirections, INewDirection } from "../types/directions";

export default class FermentStore {
  constructor(public rootStore: RootStore) {
    makeObservable(this);
  }

  // <--- Observables --->

  @observable ferments = Array<IFerment>();
  @observable directions = Array<IDirections>();
  @persist("object") @observable activeDirections = Array<IDirections>();
  @persist("object") @observable activeFerment: IFerment | undefined;

  @observable showFermentForm = false;
  @observable showDirectionForm = false;
  @observable directionIndex = 0;

  // <--- Actions --->

  @action setShowFermentForm(bool: boolean) {
    this.showFermentForm = bool;
  }

  @action setShowDirectionForm(bool: boolean) {
    this.showDirectionForm = bool;
  }

  @action setDirectionIndex(index: number) {
    this.directionIndex = index;
  }

  @action setActiveFerment(fermentId: string) {
    this.activeFerment = this.ferments.find(
      (ferment) => ferment._id === fermentId
    );
  }

  @action setActiveDirections(fermentId: string) {
    this.activeDirections = this.directions.filter(direction => direction.fermentId === fermentId)
  }

  @action clearActiveFerment() {
    this.activeFerment = undefined;
    this.activeDirections = [];
  }

  @action feedFerment() {
    if (this.activeFerment) {
      this.activeFerment.lastFed = new Date();

      this.updateFerment(this.activeFerment);
    }
  }

  // <--- Compute --->

  @computed get lastFed() {
    if (this.activeFerment) {
      return format(new Date(this.activeFerment.lastFed), "EEEE do MMMM");
    }
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
      const formatted = format(date, "EEEE do MMMM");
      const distance = formatDistanceToNowStrict(date, { addSuffix: true });
      return `${formatted} (${distance})`;
    }

    return "-";
  }

  @computed get dob() {
    if (this.activeFerment) {
      return format(new Date(this.activeFerment.dob), "EEEE do MMMM");
    }
  }

  @computed get age() {
    if (this.activeFerment) {
      return formatDistanceToNowStrict(new Date(this.activeFerment.dob));
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

  getAllFermentDirections = flow(function* (this: FermentStore) {
    try {
      const { data } = yield getAllFermentDirections();
      this.directions = data.directions;
    } catch (err) {
      throw err;
    }
  });

  getFermentDirections = flow(function* (
    this: FermentStore,
    fermentId: string
  ) {
    try {
      const { data } = yield getFermentDirections(fermentId);
      this.activeDirections = data.directions;
    } catch (err) {
      throw err;
    }
  });

  createFerment = flow(function* (this: FermentStore, ferment: INewFerment) {
    try {
      const { data } = yield createFerment(ferment);
      this.activeFerment = data.ferment;
      this.ferments = [...this.ferments, data.ferment];
      this.showFermentForm = false;
    } catch (err) {
      throw err;
    }
  });

  createDirection = flow(function* (
    this: FermentStore,
    direction: INewDirection
  ) {
    try {
      const { data } = yield createDirection(direction);
      this.activeDirections = [...this.activeDirections, data.direction];
      this.directionIndex = this.activeDirections.length - 1;
    } catch (err) {
      throw err;
    }
  });

  updateFerment = flow(function* (
    this: FermentStore,
    ferment: INewFerment | IFerment
  ) {
    try {
      if (this.activeFerment) {
        const { data } = yield updateFerment(this.activeFerment._id, ferment);

        if (data.status === "success") {
          this.activeFerment = data.ferment;

          const index = this.ferments.findIndex(
            (item) => item._id === data.ferment._id
          );
          this.ferments[index] = data.ferment;

          this.showFermentForm = false;
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

  deleteDirection = flow(function* (this: FermentStore) {
    try {
      const directionId = this.activeDirections[this.directionIndex]._id;
      const directionIndex = this.directionIndex;
      this.directionIndex = 0;

      this.activeDirections.splice(directionIndex, 1);

      yield deleteDirection(directionId);
    } catch (err) {
      throw err;
    }
  });
}
