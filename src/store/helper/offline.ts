import { AppState } from '../state';

const queryString = require('query-string');


type Filters = {
  Idi?: number[];
};

type Effect = {
  url: string;
  method: string;
  filters?: Filters;
  headers?: Object;
};

type CommitRollback = {
  type: string;
  meta?: any;
};

type OfflineMetadata = {
  effect: Effect;
  commit: CommitRollback;
  rollback: CommitRollback;
};

const createOfflineAction = (
  getState: () => AppState,
  type: string,
  payload: any,
  offline: OfflineMetadata
) => {

  const effect = offline.effect as any;

  const headers = effect.headers || {};

  effect.headers = {
    ...headers,
    'content-type': 'application/json;charset=utf8'
  };

  /*
  if (effect.filters) {
    const filters = { ...effect.filters };
    effect.url = queryString.stringifyUrl({ url: effect.url, query: filters });
  }
  */

  return {
    type,
    payload,
    meta: {
      offline
    }
  };
};

export { createOfflineAction, Filters };
