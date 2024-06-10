<template>

    <nav>
        <TheNavigation />
    </nav>
  <router-view/>
</template>


<script>
    import TheNavigation from '@/components/TheNavigation.vue'

    export default {
        components: {
        TheNavigation
        }
    }

</script>
