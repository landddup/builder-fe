const signUpRules = {
  email: ["required", "trim", "email"],
  password: ["required", "trim", "string", { min_length: 8 }],
  passwordConfirm: [
    "required",
    "trim",
    "string",
    { min_length: 8 },
    { equal_to_field: "password" },
  ],
};

export default signUpRules;
