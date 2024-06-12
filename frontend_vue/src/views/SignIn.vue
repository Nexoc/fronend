<template>
<div class="body">
<div id="app" class="main">

    <img src="../assets/logo.png" alt="">
    <form @submit.prevent="signIn">
        <h2>{{ signInError }}</h2>
        <div class="signin">
            <div id='signin'>
                <input 
                type="text" 
                name="email" 
                placeholder="Email"
                v-model="data.email"       
                />
            </div>

            <div id='login'>
                <input 
                type="password" 
                name="password"
                placeholder="Password"
                v-model="data.password"        
                />
            </div>
        </div>

        <button id='login'>Sign in</button>
    </form>

</div>
</div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'signIn',
        components: {
            //
        },
        data() {
            return {
                data: {
                    email: '',
                    password: ''
                }
            }
        },


        methods: {   
            async signIn() {
                this.$store.dispatch('signIn', this.data)
                .then(() => {
                    if (this.authenticated) {
                        this.$router.replace({name: 'home'})
                    }
                })
            },
        },
        computed: {
            ...mapGetters({
                authenticated: "authenticated",
                username: "username",
                signInError: "signInError"
            })
        }
    }
</script>

<style scoped>
.body{
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #fefeff, #a7acac, #609c60);
}
.main{
	width: 400px;
	height: 500px;
	background: rgb(255, 255, 255);
	overflow: hidden;
    border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
    margin: 0 auto;
}
.signin{
	position: relative;
	width:100%;
	height: 100%;
}
input{
	width: 60%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #60aa7f;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #025706;
}
img{
	width: 325px;
    margin: 30px auto;
    display: flex;
	justify-content: center;
}
.links{
    display: flex;
	justify-content: center;
}
h2{
    color: rgb(252, 0, 0);
    display: flex;
    justify-content: center;
    margin: 30px auto;
}
</style>