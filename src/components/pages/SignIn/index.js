import React, { useState } from "react";

import Input from "../../base/Input";
import Button from "../../base/Button";

import styles from "./index.module.scss";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: { value: "", placeholder: "Email", errorMessage: "" },
    password: { value: "", placeholder: "Password", errorMessage: "" },
  });

  const handleInputChange = (value, valueKey) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], value },
    }));
  };

  return (
    <form className={styles.container}>
      <Input valueKey="email" onChange={handleInputChange} {...inputs.email} />

      <Input
        valueKey="password"
        onChange={handleInputChange}
        {...inputs.password}
      />

      <Button label="Login" />
    </form>
  );
};

export default SignIn;
