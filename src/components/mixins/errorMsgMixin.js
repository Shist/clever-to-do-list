export default {
  methods: {
    getErrorMsg(error) {
      if (!error.code) {
        return error.message;
      }
      switch (error.code) {
        case "auth/invalid-email":
          return "The email you provided is not registered.";
        case "auth/invalid-credential":
          return "The credentials you provided are incorrect. You probably entered the password incorrectly.";
        case "auth/email-already-in-use":
          return "The email you specified has already been registered. Log in or register another one.";
        default:
          return error.message;
      }
    },
  },
};
