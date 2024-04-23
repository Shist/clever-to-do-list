<template>
  <div class="sign-in-page">
    <form action="#" class="sign-in-page__form">
      <h2 class="sign-in-page__headline">Sign in</h2>
      <label class="sign-in-page__email-input-label" for="emailInput">
        Enter your email below:
      </label>
      <input
        type="email"
        name="email"
        class="sign-in-page__email-input"
        id="emailInput"
        placeholder="Email"
        required
      />
      <label class="sign-in-page__password-input-label" for="passwordInput">
        Enter your password below:
      </label>
      <input
        type="password"
        name="password"
        class="sign-in-page__password-input"
        id="passwordInput"
        placeholder="Password"
        required
      />
      <button class="sign-in-page__confirm-btn" type="submit">Confirm</button>
    </form>
    <h3 class="sign-in-page__sign-up-suggestion-headline">
      Don't have account yet?
    </h3>
    <a class="sign-in-page__sign-up-btn" @click="this.$router.push('/sign-up')">
      Sign up
    </a>
  </div>
</template>

<script>
export default {
  name: "sign-in-page",
};
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-in-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    .sign-in-page__headline {
      @include default-headline(42px, 42px, $color-black);
      margin-bottom: 30px;
      text-align: center;
    }
    .sign-in-page__email-input-label {
      @include default-text(24px, 24px, $color-black);
      margin-bottom: 10px;
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-in-page__email-input {
      @extend %default-input;
      margin-bottom: 20px;
    }
    .sign-in-page__password-input-label {
      @include default-text(24px, 24px, $color-black);
      margin-bottom: 10px;
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .sign-in-page__password-input {
      @extend %default-input;
      margin-bottom: 40px;
    }
    .sign-in-page__confirm-btn {
      @include default-btn(300px, $color-white, $color-orange);
      margin-bottom: 20px;
    }
  }
  &__sign-up-suggestion-headline {
    @include default-text(20px, 20px, $color-black);
  }
  &__sign-up-btn {
    @include default-btn(100px, $color-white, $color-orange);
  }
}
</style>