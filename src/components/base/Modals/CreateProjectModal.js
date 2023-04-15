import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { modalActions, projectsActions } from "../../../actions";
import { validateCreateProject } from "../../../utils/validation";
import { preparePayload } from "../../../utils/validation/helpers";

import Block from "../Block";
import FormModal from "./ModalTypes/FormModal";

const NEW_PROJECT_INPUTS = {
  title: {
    value: "",
    label: "Title",
    placeholder: "New project title",
    required: true,
    errorMessage: "",
  },
};

const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const { currentSession } = useSelector((state) => state.session);

  const [inputs, setInputs] = useState(NEW_PROJECT_INPUTS);
  const [fetching, setFetching] = useState(false);

  const hideModal = () => {
    dispatch(modalActions.hideModal());
  };

  const createProject = async (validData) => {
    const payload = { ...validData, uid: currentSession.uid };

    setFetching(true);

    await dispatch(projectsActions.addNewProject(payload));

    setFetching(false);
    hideModal();
  };

  const setErrors = (errors) => {
    setInputs((prev) => {
      const output = { ...prev };

      Object.keys(errors).forEach((errorKey) => {
        output[errorKey].errorMessage = errors[errorKey];
      });

      return output;
    });
  };

  const handleSubmit = (inputs) => {
    const payload = preparePayload(inputs, "value");

    validateCreateProject({
      data: payload,
      onSuccess: (validData) => createProject(validData),
      onError: setErrors,
    });
  };

  return (
    <Block title="New Project info">
      <FormModal
        inputs={inputs}
        submitButton="Add project"
        isLoading={fetching}
        onSubmit={handleSubmit}
        onCancel={hideModal}
      />
    </Block>
  );
};

export default CreateProjectModal;
