import React from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../actions";

import { LoadingContainer } from "../../containers";
import { SvgIcon } from "../../shared";

import styles from "./index.module.scss";

const BuilderElementsMenu = () => {
  const { elementsLoading, elements } = useSelector((state) => state.builder);
  const dispatch = useDispatch();

  const handleDragStart = (element) => () => {
    dispatch(actions.builder.setDraggedElement(element));
  };

  return (
    <div className={styles.container}>
      <LoadingContainer width={30} height={30} isLoading={elementsLoading}>
        <div className={styles.nav}>
          {Object.values(elements).map((element) => {
            const { title, icon } = element;

            return (
              <div
                draggable
                key={title}
                className={styles.element}
                onDragStart={handleDragStart(element)}
              >
                <SvgIcon type={icon} className={styles.icon} />

                <p className={styles.title}>{title}</p>
              </div>
            );
          })}
        </div>
      </LoadingContainer>
    </div>
  );
};

export default BuilderElementsMenu;
