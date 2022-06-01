<template>
  <router-view />
  <Footer />
</template>

<script>
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style lang="scss">
* {
  box-sizing:content-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.flex {
  display: flex;

  &_row {
    flex-direction: row;
  }

  &_column {
    flex-direction: column;
  }

  &_between {
    justify-content: space-between;
  }

  &_around {
    justify-content: space-around;
  }

  &_justify {
    &--center{
    justify-content: center;
    }
    &--right{
      justify-content: right;
    }
  }

  &_align {
    &--center{
    align-items: center;
    }
    &--right{
      align-items: right;
    }
  }
}
</style>
