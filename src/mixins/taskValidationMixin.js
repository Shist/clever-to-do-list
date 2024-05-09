export default {
  methods: {
    getTaskValidationError(title, description) {
      if (!title) {
        return "Title can not be empty!";
      } else if (title.length > 64) {
        return "Title can not be longer than 64 characters!";
      }

      if (!description) {
        return "Description can not be empty!";
      } else if (description.length > 512) {
        return "Description can not be longer than 512 characters!";
      }

      return null;
    },
  },
};
