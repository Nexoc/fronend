<template>
    <ul>
        <template v-if="authenticated">

        <li>
            <form @submit.prevent="home">
                <button>Home</button>
            </form>
        </li>

        <li>
            <form @submit.prevent="reporter">
                <button>Show all reporter</button>
            </form>
        </li>

        <li>
            <button>{{ username }}</button>                
        </li>
 
        <li class="logout" style="float:right">
            <form @submit.prevent="logOut">
            <button>Logout</button>
            </form>
        </li>

        </template>

        <template v-else>
            <li>
                <router-link :to="{ name: 'signin' }">
                    Sign in
                </router-link>
            </li>

            <li>
                <router-link :to="{ name: 'registration' }">
                    Registration
                </router-link>
            </li>
            
        </template>
    </ul>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'TheNavigation',
                
        methods: {   

            logOut() {
                //console.log('log Out the navigation')
                this.$store.dispatch('logOut')
                .then(() => {
                    this.$router.replace({
                        name: 'signin'
                    })
                })
            },

            home() {
                this.$router.replace({
                        name: 'home'
                })
            },
            reporter() {
                this.$router.replace({
                        name: 'reporter'
                })
            },
        },

        computed: {
            ...mapGetters({
                authenticated: "authenticated",
                username: "username"
            })
        }
    }

</script>

