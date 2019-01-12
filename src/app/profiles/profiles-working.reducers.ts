import {ProfilesCommands} from './profiles.commands';


const initState = {
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


function complete(cmdType) {
  return cmdType + '_COMPLETE';
}

export function getReducers() {

  return (state = initState, event) => {

    switch (event.type) {

      case complete(ProfilesCommands.QUERY_ALL) : {
        return queryAllComplete(state, event);
      }
      case complete(ProfilesCommands.QUERY_BY_ID) : {
        return queryByIdComplete(state, event);
      }

      case complete(ProfilesCommands.UPDATE) : {
        return updateComplete(state, event);
      }

      case complete(ProfilesCommands.CREATE) : {
        return createComplete(state, event);
      }

      case complete(ProfilesCommands.DELETE) : {
        return deleteComplete(state, event);
      }

      default: {
        return state;
      }
    }
  };
}










