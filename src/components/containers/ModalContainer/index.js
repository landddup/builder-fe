import React, { useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { modalActions } from "../../../actions";

import CreateProjectModal from "../../base/Modals/CreateProjectModal";

import styles from "./index.module.scss";

const MODALS_BY_TYPE = {
  createProject: CreateProjectModal,
};

const TITLES_BY_TYPE = {
  createProject: "New Project info",
};

const DummyModal = () => <div />;

const ModalContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { currentModal } = useSelector((state) => state.modal);

  const { ModalComponent } = useMemo(() => {
    const ModalComponent = MODALS_BY_TYPE[currentModal?.type] || DummyModal;
    const title = TITLES_BY_TYPE[currentModal?.type] || "";

    return { ModalComponent, title };
  }, [currentModal]);

  const containerRef = useRef();

  const hideModal = ({ target }) => {
    const shouldHide = target === containerRef.current;

    if (shouldHide) {
      dispatch(modalActions.hideModal());

      if (currentModal.onClose) {
        currentModal.onClose();
      }
    }
  };

  return (
    <div>
      {children}

      <div
        ref={containerRef}
        onClick={hideModal}
        className={classNames(styles.container, {
          [styles.containerVisible]: !!currentModal,
        })}
      >
        <div className={styles.content}>
          <div
            className={classNames(styles.modal, {
              [styles.modalVisible]: !!currentModal,
            })}
          >
            <ModalComponent currentModal={currentModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
