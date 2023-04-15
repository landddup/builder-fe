import { clearModal, updateModal } from "../reducers/modal";

export function showModal(currentModal) {
  return async (dispatch) => {
    await dispatch(updateModal({ currentModal }));
  };
}

export function hideModal() {
  return async (dispatch) => {
    await dispatch(clearModal());
  };
}
