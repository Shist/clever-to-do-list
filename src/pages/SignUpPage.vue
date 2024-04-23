<template>
  <div class="sign-up-page">
    <form action="#" class="sign-up-page__form">
      <h2 class="sign-up-page__headline">Sign Up</h2>
      <label class="sign-up-page__email-input-label" for="emailInput">
        Enter your email below:
      </label>
      <input
        type="email"
        name="email"
        class="sign-up-page__email-input"
        id="emailInput"
        placeholder="Email"
        required
      />
      <label class="sign-up-page__password-input-label" for="passwordInput">
        Enter your password below:
      </label>
      <input
        type="password"
        name="password"
        class="sign-up-page__password-input"
        id="passwordInput"
        placeholder="Password"
        required
      />
      <label
        class="sign-up-page__repeat-password-input-label"
        for="repeatPasswordInput"
      >
        Repeat your password below:
      </label>
      <input
        type="password"
        name="repeat-password"
        class="sign-up-page__repeat-password-input"
        id="repeatPasswordInput"
        placeholder="Repeat password"
        required
      />
      <button
        class="sign-up-page__confirm-btn"
        type="submit"
        @click="onConfirmBtnClicked"
      >
        Confirm
      </button>
    </form>
    <h3 class="sign-up-page__sign-up-suggestion-headline">
      Already have an account?
    </h3>
    <a class="sign-up-page__sign-up-btn" @click="this.$router.push('/sign-in')">
      Sign in
    </a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "sign-up-page",
  methods: {
    ...mapMutations({
      setVisibility: "snackbar/setVisibility",
      setMessage: "snackbar/setMessage",
      setIsPermanent: "snackbar/setIsPermanent",
      setColorClass: "snackbar/setColorClass",
    }),
    onConfirmBtnClicked() {
      this.setVisibility(true);
      this.setMessage("Loading...");
      this.setIsPermanent(true);
      this.setColorClass("info");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-up-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    .sign-up-page__headline {
      @include default-headline(42px, 42px, $color-black);
      margin-bottom: 30px;
      text-align: center;
    }
    .sign-up-page__email-input-label {
      @include default-text(24px, 24px, $color-black);
      margin-bottom: 10px;
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-up-page__email-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-up-page__password-input-label {
      @include default-text(24px, 24px, $color-black);
      margin-bottom: 10px;
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-up-page__password-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-up-page__repeat-password-input-label {
      @include default-text(24px, 24px, $color-black);
      margin-bottom: 10px;
      @media (max-width: $phone-l) {
        font-size: 19px;
        line-height: 19px;
      }
    }
    .sign-up-page__repeat-password-input {
      @extend %default-input;
      margin-bottom: 40px;
    }
    .sign-up-page__confirm-btn {
      @include default-btn(300px, $color-white, $color-orange);
      margin-bottom: 20px;
    }
  }
  &__sign-up-suggestion-headline {
    @include default-text(20px, 20px, $color-black);
    margin-bottom: 5px;
  }
  &__sign-up-btn {
    @include default-btn(100px, $color-white, $color-orange);
  }
}
</style>
