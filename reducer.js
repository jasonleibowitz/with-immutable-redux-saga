import { fromJS } from 'immutable';
import {actionTypes} from './actions'

export const exampleInitialState = fromJS({
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
});

function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      console.log('/// in reducer error:', action.error);
      return state.merge({ error: action.error });

    case actionTypes.INCREMENT:
      console.log('/// in reducer increment', state.get('count'))
      return state.merge({ count: state.get('count') + 1 });

    case actionTypes.LOAD_DATA_SUCCESS:
      console.log('/// in reducer load data success', action.data);
      return state.merge({ placeholderData: action.data });

    case actionTypes.TICK_CLOCK:
      console.log('/// in reducer tick clock. ts:', action.ts)
      console.log('/// in reducer tick clock. light:', action.light)
      // On SSR state is always an immutable Map.
      // However, on client side rendering it's a POJO
      console.log('/// in reducer - tick clock, state:', state);
      return state.merge({ lastUpdate: action.ts, light: !!action.light });

    default:
      return state
  }
}

export default reducer
