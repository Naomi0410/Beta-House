const validateFields = {
  email: {
    required: "Required field.",
    validate: {
      maxLength: (v) =>
        v.length <= 50 || "The email should have at most 50 characters",
      matchPattern: (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Invalid email",
    },
  },
  password: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  confirmPassword: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  currentPassword: {
    required: "Please enter your current password",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  firstName: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 2 || "First name should have at least 2 characters",
      matchPattern: (v) =>
        /^[a-zA-Z]+$/.test(v) || "First name should only contain letters",
    },
  },
  lastName: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 2 || "Last name should have at least 2 characters",
      matchPattern: (v) =>
        /^[a-zA-Z]+$/.test(v) || "Last name should only contain letters",
    },
  },
};

export default validateFields;
