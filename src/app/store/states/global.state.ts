import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  GlobalSpinner,
  HideAside,
  updateAside,
} from '../actions/global.action';

export class GlobalStateModel {
  spinner: boolean;
  aside: boolean;
}

@State<GlobalStateModel>({
  name: 'Global',
  defaults: {
    spinner: false,
    aside: false,
  },
})
@Injectable()
export class GlobalState {
  @Selector()
  static getSpinner(state: GlobalStateModel) {
    return state.spinner;
  }

  @Selector()
  static getAside(state: GlobalStateModel) {
    return state.aside;
  }

  @Action(GlobalSpinner)
  spinner({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState({ ...state, spinner: !state.spinner });
  }

  @Action(updateAside)
  updateAside({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState({ ...state, aside: !state.aside });
  }

  @Action(HideAside)
  hideAside({ getState, setState }: StateContext<GlobalStateModel>) {
    const state = getState();
    setState({ ...state, aside: true });
  }
}
