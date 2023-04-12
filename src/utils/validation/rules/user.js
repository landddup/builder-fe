const userRules = {
  displayName: ["trim", "string"],
  email: ["required", "trim", "email"],
};

export default userRules;
