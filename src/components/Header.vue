<template>
  <header class="header">
    <h1>Scroll Toggle</h1>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>
