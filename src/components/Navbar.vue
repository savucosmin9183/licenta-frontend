<template>
  <div class="navbar">
    <b-icon v-if="!initial_page" icon="arrow-left-circle" class="back-icon" @click="back_navigation"></b-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    back_navigation(){
      this.$router.go(-1)
    }
  },
  computed: mapState(
        ['initial_page']
    )
}
</script>


<style>
  .navbar{
    height: 100%;
    width: 10%;
    background-color: #1b2427ba;
    margin: 0;
    position: relative;
  }

  .back-icon{
    width: 60px;
    height: 60px;
    cursor: pointer;
    position: absolute;
    top: 30%;
    left: 35%;
  }
</style>