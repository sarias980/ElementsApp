import { Store, AnyAction } from 'redux';
//import Logger from 'js-logger';

//const logger = Logger.get('SIGNALR_MIDDLEWARE');

const signalRActions = () => {
  return (store: Store) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      /*
      switch (action.type) {

        default:
          break;
      }
      */
      return next(action);
    };
  };
};

export default signalRActions;
