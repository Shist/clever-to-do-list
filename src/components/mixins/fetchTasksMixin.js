import { mapState, mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setDatesTaskData: "datesAndTasks/setDatesTaskData",
    }),
    ...mapActions({
      loadUserTasks: "firebase/loadUserTasks",
    }),
    async fetchTasks() {
      await this.loadUserTasks();

      const datesInfoObj = {};

      this.userTasks.forEach((task) => {
        const dateStr = new Date(
          task.date.seconds * 1000 + task.date.nanoseconds / 1000000
        ).toLocaleDateString();

        if (!datesInfoObj[dateStr]) {
          datesInfoObj[dateStr] = [];
        }

        datesInfoObj[dateStr].push({
          id: task.id,
          checked: task.checked,
          title: task.title,
          description: task.description,
        });
      });

      this.setDatesTaskData(datesInfoObj);
    },
  },
  computed: {
    ...mapState({
      userTasks: (state) => state.firebase.userTasks,
    }),
  },
};
