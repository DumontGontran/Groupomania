<template>
  <header>
    <img class="logo" src="../assets/logo/icon-left-font.svg" alt="Logo Groupomania"/>
  </header>
</template>

<script>
export default {
  name: "Header-component",
  props: {},
};
</script>

<style lang="scss" scoped>
header{
border-bottom: 1px solid black;
}

.logo{
    width: 200px;
    height: 200px;
}
</style>