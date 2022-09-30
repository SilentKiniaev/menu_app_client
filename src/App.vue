<template>
  <div class="container mb-5">
    <nav class="d-flex justify-content-between align-items-center">
      <div>DARALL</div>
      <!-- <router-link to="/">Menu</router-link> -->
      <button type="button" class="btn btn-light">Войти</button>
    </nav>
    <router-view />
  </div>
  <!-- <div
    v-if="true"
    class="spinner-border text-success position-absolute top-50 start-50"
    role="status"
    style="z-index: 1001"
  >
    <span class="visually-hidden">Loading...</span>
  </div> -->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
