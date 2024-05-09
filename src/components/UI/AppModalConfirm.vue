<template>
  <div class="modal" v-show="isOpened" @click="onModalClicked">
    <div class="modal__wrapper">
      <button class="modal__close-btn" @click.stop="$emit('declined')"></button>
      <h3 class="modal__headline"><slot name="headline"></slot></h3>
      <span class="modal__text"><slot name="text"></slot></span>
      <div class="modal__btns-wrapper">
        <button class="modal__btn-yes" @click.stop="$emit('confirmed')">
          Yes
        </button>
        <button class="modal__btn-no" @click.stop="$emit('declined')">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-modal-confirm",

  props: {
    isOpened: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onModalClicked(event) {
      if (event.target.className === "modal") {
        this.$emit("declined");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.modal {
  padding: 20px;
  position: fixed;
  min-width: 100vw;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  &__wrapper {
    position: relative;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    background-color: $color-white;
    padding: 20px;
    border-radius: 10px;
    @media (max-width: $phone-l) {
      padding: 50px 10px 10px;
    }
    .modal__close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 50px;
      height: 50px;
      border: none;
      cursor: pointer;
      transition: 0.2s;
      background-color: transparent;
      background-image: url("@/assets/icons/cross.png");
      background-size: cover;
    }
    .modal__headline {
      align-self: center;
      text-align: center;
      @include default-headline(48px, 48px, $color-black);
      padding-inline: 40px;
      @media (max-width: $tablet-l) {
        font-size: 34px;
        line-height: 34px;
      }
      @media (max-width: $phone-l) {
        font-size: 24px;
        line-height: 24px;
      }
    }
    .modal__text {
      text-align: center;
      @include default-text(28px, 28px, $color-black);
      @media (max-width: $tablet-l) {
        font-size: 24px;
        line-height: 24px;
      }
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .modal__btns-wrapper {
      display: flex;
      justify-content: center;
      column-gap: 30px;
      .modal__btn-yes {
        @include default-btn(150px, $color-white, $color-orange);
        border: 2px solid $color-orange;
      }
      .modal__btn-no {
        @include default-btn(150px, $color-black, $color-white);
        border: 2px solid $color-black;
      }
    }
  }
}
</style>
