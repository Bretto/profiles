import {ProfilesCommands} from './profiles.commands';
import {FSA, handleEvent, reduceReducers} from '../shared/utils';


export interface ProfileState {
  entities: { [key: string]: any };
}

const initState: ProfileState = {
  entities: {}
};


const queryAllComplete = handleEvent<ProfileState, FSA>(
  ProfilesCommands.QUERY_ALL,
  (state, event) => {
    const newEntities = event.error ? null : event.payload;
    const oldEntities = state.entities;
    const entities = {...oldEntities, ...newEntities};
    return {
      ...state,
      entities
    };

  });


const queryByIdComplete = handleEvent<ProfileState, FSA>(
  ProfilesCommands.QUERY_BY_ID,
  (state, event) => {

    const newEntity: any = event.error ? null : event.payload;
    let entities = state.entities;

    if (newEntity) {
      entities = {...entities, [newEntity.id]: newEntity};
    }

    return {
      ...state,
      entities
    };
  });

const updateComplete = handleEvent<ProfileState, FSA>(
  ProfilesCommands.UPDATE,
  (state, event) => {

    const newEntity: any = event.error ? null : event.payload;
    let entities = state.entities;

    if (newEntity) {
      entities = {...entities, [newEntity.id]: newEntity};
    }

    return {
      ...state,
      entities
    };
  });

const createComplete = handleEvent<ProfileState, FSA>(
  ProfilesCommands.CREATE,
  (state, event) => {

    const newEntity: any = event.error ? null : event.payload;
    let entities = state.entities;

    if (newEntity) {
      entities = {...entities, [newEntity.id]: newEntity};
    }

    return {
      ...state,
      entities
    };
  });

const deleteComplete = handleEvent<ProfileState, FSA>(
  ProfilesCommands.DELETE,
  (state, event) => {

    const profileId = event.payload;
    debugger
    const entities = {...state.entities};
    const deletedEntity = {...entities[profileId], deleted: true};
    entities[profileId] = deletedEntity;

    return {
      ...state,
      entities
    };
  });


export const getReducers = reduceReducers<ProfileState>(
  initState,
  [
    queryAllComplete,
    queryByIdComplete,
    createComplete,
    updateComplete,
    deleteComplete
  ]
);


