import {FSA, reduceReducers, toEvent} from '../shared/utils';
import {UiCommands} from './ui.commands';


export interface UiState {
  online: boolean;
  handset: boolean;
  openMenu: boolean;
}

const initState: UiState = {
  online: null,
  handset: null,
  openMenu: null,
};


// const setState = handleEvent<UiState, FSA>([
//   UiCommands.OPEN_MENU,
//   UiCommands.ONLINE_WATCHER,
//   UiCommands.BREAKPOINT_WATCHER
// ], (state, event) => {
//   const value = event.payload.value;
//   const propName = event.payload.propName;
//   return {
//     ...state,
//     [propName]: value
//   };
// });

const setState = (state, event) => {
  const value = event.payload.value;
  const propName = event.payload.propName;
  return {
    ...state,
    [propName]: value
  };
};

// export const getReducers = reduceReducers<UiState>(
//   initState,
//   [
//     setState,
//   ]
// );



export function getReducers(
  state = initState,
  event: any
): UiState {
  switch (event.type) {

    case toEvent(UiCommands.ONLINE_WATCHER):
    case toEvent(UiCommands.OPEN_MENU):
    case toEvent(UiCommands.BREAKPOINT_WATCHER): {
      return setState(state, event);
    }

    default: {
      return state;
    }
  }
};








