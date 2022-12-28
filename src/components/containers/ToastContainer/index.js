import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../actions";

import Toast from "../../base/Toast";

const ToastContainer = () => {
  const dispatch = useDispatch();
  const { type, message, duration } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!!message) {
      setTimeout(() => {
        dispatch(actions.toastActions.hide());
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return <Toast type={type} message={message} />;
};

export default ToastContainer;
