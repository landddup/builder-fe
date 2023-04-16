import React, { useState } from "react";
import PropTypes from "prop-types";
import randomWords from "random-words";

import SvgIcon from "../../../../../shared/SvgIcon";
import Button from "../../../../../shared/Button";

import styles from "./index.module.scss";

const Template = ({ title, onAdd }) => {
  const [fetching, setFetching] = useState(false);

  const handleAdd = async () => {
    setFetching(true);

    const title = randomWords({
      exactly: 1,
      wordsPerString: 2,
      join: " ",
      formatter: (word) => {
        return word.slice(0, 1).toUpperCase().concat(word.slice(1));
      },
    });

    await onAdd({ title });

    setFetching(false);
  };

  return (
    <div className={styles.template}>
      <p className={styles.title}>{title}</p>

      <div className={styles.preview}>
        <SvgIcon type="gridAdd" className={styles.icon} />

        <Button
          className={styles.button}
          label="Create"
          size="small"
          isLoading={fetching}
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

Template.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func,
};

Template.defaultProps = {
  title: "",
  onAdd: () => {},
};

export default Template;
