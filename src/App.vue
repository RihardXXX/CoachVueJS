<template>
  <TheHeader />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader';
import { actionsTypes } from '@/store/modules/authModule';

export default {
  name: 'App',
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch(actionsTypes.trySignIn);
  }
};
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
