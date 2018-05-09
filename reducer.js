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
      return state.merge({ error: action.error });

    case actionTypes.INCREMENT:
      return state.merge({ count: state.count + 1 });

    case actionTypes.LOAD_DATA_SUCCESS:
      return state.merge({ placeholderData: action.data });

    case actionTypes.TICK_CLOCK:
      return state.merge({ lastUpdate: action.ts, light: !!action.light });

    default:
      return state
  }
}

export default reducer
