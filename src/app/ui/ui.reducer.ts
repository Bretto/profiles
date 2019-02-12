import {FSA, toEvent} from '../shared/utils';
import {UiCommands} from './ui.commands';
import {Nav} from '../shell-nav/components/nav/nav.component';


export interface UiState {
  animationDirection: number;
  headerIsVisible: boolean;
  online: boolean;
  handset: boolean;
  openMenu: boolean;
  user: User;
  currentNav: Nav;
}

const initState: UiState = {
  animationDirection: 0,
  headerIsVisible: true,
  online: null,
  handset: null,
  openMenu: null,
  user: null,
  currentNav: null
};

const setState = (state, event) => {
  const value = event.payload.value;
  const propName = event.payload.propName;
  return {
    ...state,
    [propName]: value
  };
};

export function getReducers(
  state = initState,
  event: any
): UiState {
  switch (event.type) {
    case toEvent(UiCommands.CURRENT_NAV):
    case toEvent(UiCommands.ANIMATION_DIRECTION):
    case toEvent(UiCommands.HEADER_IS_VISIBLE):
    case toEvent(UiCommands.ONLINE_WATCHER):
    case toEvent(UiCommands.OPEN_MENU):
    case toEvent(UiCommands.AUTH_WATCHER):
    case toEvent(UiCommands.BREAKPOINT_WATCHER): {
      return setState(state, event);
    }

    default: {
      return state;
    }
  }
}








