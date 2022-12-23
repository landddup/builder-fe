function configConstruct({ config }) {
  const AVAILABLE_KEYS = ["REACT_APP_API_URL"];
  const myConfig = {};

  Object.keys(config).forEach((key) => {
    const value = config[key];

    if (AVAILABLE_KEYS.includes(key)) {
      myConfig[key] = value;
    }
  });

  return myConfig;
}

const appConfig = configConstruct({ config: process.env });

export default appConfig;
