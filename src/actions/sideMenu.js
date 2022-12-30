import { showMenu, hideMenu } from "../reducers/sideMenu";

export function showSideMenu() {
  return async (dispatch) => {
    dispatch(showMenu());
  };
}

export function hideSideMenu() {
  return async (dispatch) => {
    dispatch(hideMenu());
  };
}
