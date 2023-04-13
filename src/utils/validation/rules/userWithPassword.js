const userWithPasswordRules = {
  displayName: ["trim", "string"],
  email: ["required", "trim", "email"],
  phoneNumber: ["trim", { max_length: 10 }],
  password: ["required", "trim", "string", { min_length: 8 }],
};

export default userWithPasswordRules;
