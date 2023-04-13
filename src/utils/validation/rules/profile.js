const profileRules = {
  displayName: ["trim", "string"],
  email: ["required", "trim", "email"],
  phoneNumber: ["trim", { max_length: 10 }],
};

export default profileRules;
