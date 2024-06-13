<template>

    <nav>
        <TheNavigation />
    </nav>

    <div id="sidebar">
        <SideBar />
    </div>

    
  <router-view/>
</template>


<script>
    import TheNavigation from '@/components/TheNavigation.vue'
    import SideBar from '@/components/SideBar.vue'

    export default {
        components: {
        TheNavigation,
        SideBar
        }
    }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>