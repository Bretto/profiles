import {ProfilesCommands} from './profiles.commands';
import {FSA, toEvent} from '../shared/utils';
import {UiCommands} from '../ui/ui.commands';
import {UiState} from '../ui/ui.reducer';


export interface ProfileState {
  entities: { [key: string]: any };
}

const initState: ProfileState = {
  entities: {}
};


const queryAllComplete = (state, event) => {
  const newEntities = event.error ? null : event.payload;
  const oldEntities = state.entities;
  const entities = {...oldEntities, ...newEntities};
  return {
    ...state,
    entities
  };

};


const queryByIdComplete = (state, event) => {

  const newEntity: any = event.error ? null : event.payload;
  let entities = state.entities;

  if (newEntity) {
    entities = {...entities, [newEntity.id]: newEntity};
  }

  return {
    ...state,
    entities
  };
};

const updateComplete = (state, event) => {

  const newEntity: any = event.error ? null : event.payload;
  let entities = state.entities;

  if (newEntity) {
    entities = {...entities, [newEntity.id]: newEntity};
  }

  return {
    ...state,
    entities
  };
};

const createComplete = (state, event) => {

  const newEntity: any = event.error ? null : event.payload;
  let entities = state.entities;

  if (newEntity) {
    entities = {...entities, [newEntity.id]: newEntity};
  }

  return {
    ...state,
    entities
  };
};

const deleteComplete = (state, event) => {

  const profileId = event.payload;
  const entities = {...state.entities};
  const deletedEntity = {...entities[profileId], deleted: true};
  entities[profileId] = deletedEntity;

  return {
    ...state,
    entities
  };
};


export function getReducers(
  state = initState,
  event: any
): ProfileState {
  switch (event.type) {

    case toEvent(ProfilesCommands.CREATE): {
      return createComplete(state, event);
    }

    case toEvent(ProfilesCommands.QUERY_ALL): {
      return queryAllComplete(state, event);
    }

    case toEvent(ProfilesCommands.QUERY_BY_ID): {
      return queryByIdComplete(state, event);
    }

    case toEvent(ProfilesCommands.UPDATE): {
      return updateComplete(state, event);
    }

    case toEvent(ProfilesCommands.DELETE): {
      return deleteComplete(state, event);
    }

    default: {
      return state;
    }
  }
}



