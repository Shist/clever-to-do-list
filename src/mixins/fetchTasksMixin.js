import { mapState, mapMutations } from "vuex";
import { loadUserTasks } from "@/services/firebase";

export default {
  methods: {
    ...mapMutations({
      setDatesTaskData: "datesAndTasks/setDatesTaskData",
    }),

    async fetchTasks() {
      await loadUserTasks();

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
      userTasks: (state) => state.userData.userTasks,
    }),
  },
};
