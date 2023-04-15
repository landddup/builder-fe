import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toastActions } from "../../../actions";

import Toast from "../../base/Toast";

const ToastContainer = ({ children }) => {
  const dispatch = useDispatch();
  const hideRef = useRef();

  const { type, message, duration } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!!message) {
      clearTimeout(hideRef.current);

      hideRef.current = setTimeout(() => {
        dispatch(toastActions.hide());
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <div>
      {children}

      <Toast type={type} message={message} />
    </div>
  );
};

export default ToastContainer;
