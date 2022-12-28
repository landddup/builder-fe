import { showToast, hideToast } from "../reducers/toast";

export function show(toast) {
  return async (dispatch) => {
    dispatch(showToast(toast));
  };
}

export function hide() {
  return async (dispatch) => {
    dispatch(hideToast());
  };
}
