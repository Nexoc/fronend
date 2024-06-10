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
            <button>{{ user }}</button>                
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
                user: "user"
            })
        }
    }

</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(228, 228, 228);
  flex-wrap: wrap;
  align-content: stretch;
  border: 4px outset;
  border-radius: 30%;
}
li {
  float: left;
  background: #60aa7f;
}
li a {
  display: block;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover:not(.active) {
	background: #025706;
}
.active {
  background-color: #04AA6D;
}

button {
    background: #60aa7f;
    color: rgb(255, 255, 255);
    padding: 1em;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
}
button:hover {
	background: #025706;
}
p {
    color: rgb(255, 255, 255);
    text-align: center;
    text-decoration: none;
}
button a:hover {
    background-color: #62855a;
}
</style>