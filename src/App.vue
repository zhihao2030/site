<template>
  <div id="app">
    <transition name="slide" mode="out-in">
    <router-view>
    </router-view>
    </transition>
  </div>
</template>

<script>

export default {
    name: 'App',
    components: {

    }
};
</script>

<style>

</style>
