<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
export default {
  components: {
    Navbar
  }
}
</script>

<style>
  html{
    width: 100vw;
    height: 100vh;
  }

  body{
    width: 100%;
    height: 100%;
  }

  *{
    margin: 0;
    padding: 0;
  }

  #app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding-right: 30px;
  }
</style>
