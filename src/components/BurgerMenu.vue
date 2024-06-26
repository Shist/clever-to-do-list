<template>
  <button class="burger-btn" @click="menuIsOpened = true"></button>
  <teleport to=".global-container">
    <div
      v-show="menuIsOpened"
      class="burger-menu"
      @click="menuIsOpened = $event.target.className !== 'burger-menu'"
    >
      <nav class="burger-menu__nav">
        <div class="burger-menu__curr-acc-wrapper">
          <span class="burger-menu__curr-acc-label">Current account:</span>
          <span class="burger-menu__curr-acc-email">{{ userEmail }}</span>
        </div>
        <h2 class="burger-menu__headline">Menu</h2>
        <ul class="burger-menu__nav-list">
          <li class="burger-menu__nav-list-item">
            <a class="burger-menu__link" @click.stop="onLogOutBtnClicked">
              Log out
            </a>
          </li>
        </ul>
        <a
          href="https://github.com/Shist/clever-to-do-list"
          target="_blank"
          class="burger-menu__github-link"
        >
          <img
            src="@/assets/icons/github.png"
            alt="GitHub"
            class="burger-menu__github-img"
          />
          <span class="burger-menu__github-label">
            This project on GitHub
          </span>
        </a>
      </nav>
    </div>
  </teleport>
</template>

<script>
import toastMixin from "@/mixins/toastMixin.js";
import errorMsgMixin from "@/mixins/errorMsgMixin.js";
import { mapState } from "vuex";
import { signOutUser } from "@/services/firebase";

export default {
  name: "burger-menu",

  mixins: [toastMixin, errorMsgMixin],

  data() {
    return {
      menuIsOpened: false,
    };
  },

  methods: {
    async onLogOutBtnClicked() {
      try {
        await signOutUser();

        this.menuIsOpened = false;

        this.$router.push("/sign-in");
      } catch (error) {
        const errorMsg = this.getErrorMsg(error);

        this.setErrorToast(
          `An error occurred while trying to log out! ${errorMsg}`
        );
      }
    },
  },

  computed: {
    ...mapState({
      userEmail: (state) => state.userData.userEmail,
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/global";

.burger-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent url("@/assets/icons/burger-btn.svg") no-repeat center /
    cover;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
.burger-menu {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100dvh;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  &__nav {
    position: relative;
    max-width: 70%;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    background-color: $color-black;
    @media (max-width: $tablet-l) {
      padding: 20px;
    }
    @media (max-width: $phone-l) {
      padding: 10px;
    }
    .burger-menu__curr-acc-wrapper {
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      .burger-menu__curr-acc-label {
        @include default-headline(32px, 32px, $color-white);
        @media (max-width: $tablet-l) {
          font-size: 20px;
          line-height: 20px;
        }
      }
      .burger-menu__curr-acc-email {
        @include default-text(28px, 28px, $color-white);
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        @media (max-width: $tablet-l) {
          font-size: 16px;
          line-height: 16px;
        }
        @media (max-width: $phone-l) {
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
    .burger-menu__headline {
      @include default-headline(48px, 48px, $color-white);
      margin-bottom: 50px;
      text-align: center;
    }
    .burger-menu__nav-list {
      margin-bottom: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      .burger-menu__nav-list-item {
        border: 3px solid $color-white;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: scale(1.2);
          border: 3px solid $color-yellow;
          .burger-menu__link {
            color: $color-yellow;
          }
        }
        .burger-menu__link {
          @include default-text(36px, 36px, $color-white);
          display: inline-block;
          padding: 20px;
          text-decoration: none;
          transition: 0.3s;
          @media (max-width: $phone-l) {
            padding: 15px;
            font-size: 32px;
            line-height: 32px;
          }
        }
      }
    }
    .burger-menu__github-link {
      padding: 15px;
      margin: auto auto 0;
      max-width: 280px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 5px;
      border: 3px solid $color-white;
      border-radius: 10px;
      text-decoration: none;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
      &:hover > .burger-menu__github-label {
        color: $color-link-active;
      }
      @media (max-width: $phone-l) {
        padding: 10px;
        text-align: center;
      }
      .burger-menu__github-img {
        width: 30px;
        height: 30px;
      }
      .burger-menu__github-label {
        transition: 0.3s;
        @include default-text(20px, 20px, $color-white);
        @media (max-width: $tablet-l) {
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
