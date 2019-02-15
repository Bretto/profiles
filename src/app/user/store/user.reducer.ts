import {UserCommands} from './user.commands';
import {toEvent} from '../../main/utils';


export interface UserState {
  auth: User;
}

const initState: UserState = {
  auth: null,
};

const setAuth = (state, event) => {
  return {
    ...state,
    auth: event.payload
  };
};

export function getReducers(
  state = initState,
  event: any
): UserState {
  switch (event.type) {
    case toEvent(UserCommands.SET_AUTH): {
      return setAuth(state, event);
    }

    default: {
      return state;
    }
  }
}










