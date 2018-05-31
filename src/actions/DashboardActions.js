import CONSTANTS from '../constants/actionConstants';
import DashboardSource from '../sources/DashboardSource';


export function statusSuccess(status) {
  console.log('status', status);
  const action = {
    type: CONSTANTS.STATUS_SUCCESS,
    status,
  };
  return action;
}
export function statusFail() {
  const action = {
    type: CONSTANTS.STATUS_FAIL,
  };
  return action;
}


export function getStatus() {
  return dispatch =>

    DashboardSource.getStatus()
      .then((status) => {
        console.log('PARTNER', status);
        dispatch(statusSuccess(status));
      })
      .catch((err) => {
        dispatch(statusFail());
        console.log('addUserActions error', err);
      });
}
