import {ProfilesCommands} from './profiles.commands';
import {toEvent} from '../shared/utils';


export interface Profiles {
  entities: { [key: string]: any };
}

const initState: Profiles = {
  entities: {}
};


const queryAllComplete = (state: Profiles, event): Profiles => {
  const newEntities = event.error ? null : event.payload;
  const oldEntities = state.entities;
  const entities = {...oldEntities, ...newEntities};
  return {
    ...state,
    entities
  };

};


const queryByIdComplete = (state: Profiles, event): Profiles => {

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

const updateComplete = (state: Profiles, event): Profiles => {

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

const createComplete = (state: Profiles, event): Profiles => {

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

const deleteComplete = (state: Profiles, event): Profiles => {

  const profileId = event.payload;
  const entities = {...state.entities};

  entities[profileId] = {...entities[profileId], deleted: true};

  return {
    ...state,
    entities
  };
};


export function getReducers(
  state = initState,
  event: any
): Profiles {
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



