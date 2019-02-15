import {UiCommands} from './ui.commands';
import {Nav} from '../../shell-nav/components/nav/nav.component';
import {toEvent} from '../../main/utils';


export interface UiState {
  animationDirection?: number;
  headerIsVisible?: boolean;
  online?: boolean;
  handset?: boolean;
  openMenu?: boolean;
  currentNav?: Nav;
}

const initState: UiState = {
  animationDirection: 0,
  headerIsVisible: true,
  online: null,
  handset: null,
  openMenu: null,
  currentNav: null
};

const setState = (state, event) => {
  const payload = event.payload;
  return {
    ...state,
    ...payload
  };
};

export function getReducers(
  state = initState,
  event: any
): UiState {

  switch (event.type) {

    case toEvent(UiCommands.SET_UI): {
      return setState(state, event);
    }

    default: {
      return state;
    }
  }
}









