import CONSTANTS from '../constants/actionConstants';

const initialState = {
  status: {},
};
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.STATUS_SUCCESS:
      console.log('action ----', action);
      return Object.assign({}, state, {
        status: action.status,
      });

    case CONSTANTS.STATUS_FAIL:
      return Object.assign({}, state, {
        status: {},
      });

    default:
      return state;
  }
};
export default loaderReducer;
