<template>
  <div class="info-snackbar" ref="infoSnackbar" v-show="visibility">
    <span class="info-snackbar__text">{{ message }}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "info-snackbar",
  methods: {
    ...mapMutations({
      setVisibility: "snackbar/setVisibility",
      setMessage: "snackbar/setMessage",
      setIsPermanent: "snackbar/setIsPermanent",
      setColorClass: "snackbar/setColorClass",
    }),
  },
  computed: {
    ...mapState({
      visibility: (state) => state.snackbar.visibility,
      message: (state) => state.snackbar.message,
      isPermanent: (state) => state.snackbar.isPermanent,
      colorClass: (state) => state.snackbar.colorClass,
    }),
  },
  watch: {
    visibility() {
      if (!this.isPermanent) {
        setTimeout(() => {
          this.$refs.infoSnackbar.style.opacity = "0";
          setTimeout(() => {
            this.setVisibility(false);
            this.setMessage("");
            this.setIsPermanent(false);
          }, 2000);
        }, 4000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.info-snackbar {
  position: fixed;
  bottom: 4%;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-black;
  border-radius: 10px;
  transition: opacity 2s ease;
  opacity: 0.8;
  &__text {
    @include default-text(18px, 18px, $color-white);
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &_info {
      color: $color-info;
    }
    &_success {
      color: $color-success;
    }
    &_error {
      color: $color-error;
    }
  }
}
</style>
