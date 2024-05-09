import { toast } from "vue3-toastify";
import { mapState, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setCurrToastId: "toast/setCurrToastId",
    }),

    setLoadingToast(msg) {
      this.removeCurrToast();

      const loadingToastId = toast(msg, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });

      this.setCurrToastId(loadingToastId);
    },

    setSuccessToast(msg) {
      this.removeCurrToast();

      const successToastId = toast(msg, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        closeOnClick: false,
      });

      this.setCurrToastId(successToastId);
    },

    setErrorToast(msg) {
      this.removeCurrToast();

      const errorToastId = toast(msg, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        closeOnClick: false,
      });

      this.setCurrToastId(errorToastId);
    },

    removeCurrToast() {
      if (this.currToastId) {
        toast.remove(this.currToastId);
        this.setCurrToastId(null);
      }
    },
  },

  computed: {
    ...mapState({
      currToastId: (state) => state.toast.currToastId,
    }),
  },
};
