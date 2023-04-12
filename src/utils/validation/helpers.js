export const preparePayload = (inputs, inputKey) => {
  const output = {};

  Object.keys(inputs).forEach(
    (input) => (output[input] = inputs[input][inputKey])
  );

  return output;
};
