<template>
  <button class="burger-btn" @click="setMenuIsOpened(true)"></button>
  <teleport to=".global-container">
    <div v-show="menuIsOpened" class="burger-menu">
      <nav class="burger-menu__nav">
        <h2 class="burger_menu__headline">Menu</h2>
        <ul class="burger-menu__nav-list">
          <li class="burger-menu__nav-list-item">
            <a class="burger-menu__link" @click="onSignInLinkClicked">
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </teleport>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "burger-menu",
  methods: {
    ...mapMutations({
      setMenuIsOpened: "burgerMenu/setMenuIsOpened",
    }),
    onSignInLinkClicked() {
      this.setMenuIsOpened(false);
      this.$router.push("/sign-in");
    },
  },
  computed: {
    ...mapState({
      menuIsOpened: (state) => state.burgerMenu.menuIsOpened,
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
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  &__nav {
    position: relative;
    max-width: 70%;
    width: 100%;
    padding: 30px;
    background-color: $color-black;
    .burger_menu__headline {
      @include default-headline(48px, 48px, $color-white);
      margin-bottom: 50px;
      text-align: center;
    }
    .burger-menu__nav-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      .burger-menu__nav-list-item {
        padding: 20px;
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
        @media (max-width: $phone-l) {
          padding: 15px;
        }
        .burger-menu__link {
          @include default-text(36px, 36px, $color-white);
          text-decoration: none;
          transition: 0.3s;
          @media (max-width: $phone-l) {
            font-size: 32px;
            line-height: 32px;
          }
        }
      }
    }
  }
}
</style>
