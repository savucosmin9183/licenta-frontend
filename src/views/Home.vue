<template>
  <div class="home">
    <Navbar/>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'


export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>


<style>
  .home{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
</style>
