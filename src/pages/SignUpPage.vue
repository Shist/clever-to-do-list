<template>
  <div class="sign-up-page">
    <form action="#" class="sign-up-page__form">
      <h2 class="sign-up-page__headline">Sign Up</h2>
      <label class="sign-up-page__email-input-label" for="emailInput">
        Enter your email below:
      </label>
      <input
        v-model="email"
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
        v-model="password"
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
        v-model="repeatPassword"
        type="password"
        name="repeat-password"
        class="sign-up-page__repeat-password-input"
        id="repeatPasswordInput"
        placeholder="Repeat password"
        required
      />
      <button
        class="sign-up-page__confirm-btn"
        @click.prevent="onConfirmBtnClicked"
        :disabled="isLoading"
      >
        Confirm
      </button>
    </form>
    <h3 class="sign-up-page__sign-up-suggestion-headline">
      Already have an account?
    </h3>
    <a
      class="sign-up-page__sign-up-btn"
      @click="this.$router.push('/sign-in')"
      :class="{ 'disabled-link': isLoading }"
    >
      Sign in
    </a>
  </div>
</template>

<script>
import toastMixin from "@/mixins/toastMixin";
import errorMsgMixin from "@/mixins/errorMsgMixin.js";
import { mapState, mapMutations } from "vuex";
import { signUpUser } from "@/services/firebase";

export default {
  name: "sign-up-page",
  mixins: [toastMixin, errorMsgMixin],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapMutations({
      setEmail: "signUp/setEmail",
      setPassword: "signUp/setPassword",
      setRepeatPassword: "signUp/setRepeatPassword",
    }),
    getValidationError() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!this.email) {
        return "Email can not be empty!";
      } else if (!emailRegex.test(this.email)) {
        return "Email you have entered is invalid!";
      }

      if (this.password.length < 8) {
        return "Password can not be shorter than 8 characters!";
      } else if (this.password.length > 28) {
        return "Password can not be longer than 28 characters!";
      } else if (this.password !== this.repeatPassword) {
        return "The entered passwords do not match!";
      }

      return null;
    },
    async onConfirmBtnClicked() {
      const errorMsg = this.getValidationError();
      if (errorMsg) {
        this.setErrorToast(`Error! ${errorMsg}`);
        return;
      }
      this.isLoading = true;
      this.setLoadingToast("Registering an account...");
      try {
        await signUpUser(this.email, this.password);
        this.setSuccessToast("Your account has been successfully registered!");
        this.email = "";
        this.password = "";
        this.repeatPassword = "";
        this.$router.push("/");
      } catch (error) {
        const errorMsg = this.getErrorMsg(error);
        this.setErrorToast(
          `An error occurred while trying to register an account! ${errorMsg}`
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapState({
      emailState: (state) => state.signUp.email,
      passwordState: (state) => state.signUp.password,
      repeatPasswordState: (state) => state.signUp.repeatPassword,
    }),
    email: {
      get() {
        return this.emailState;
      },
      set(newValue) {
        this.setEmail(newValue);
      },
    },
    password: {
      get() {
        return this.passwordState;
      },
      set(newValue) {
        this.setPassword(newValue);
      },
    },
    repeatPassword: {
      get() {
        return this.repeatPasswordState;
      },
      set(newValue) {
        this.setRepeatPassword(newValue);
      },
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
