<template>
<div class="body">
<div id="app" class="main">

    <img src="../assets/logo.png" alt="">
    <div class="signup">
        <div id='signup'>

        <form @submit.prevent="insertUser">
        
            <div id='login'>
                <input 
                type="text" 
                name="username" 
                placeholder="Username"
                v-model="data.username"       
                />
            </div>

            <button id='login'>Registration</button>
        </form>

        <template v-if="newUser.user">
        <div class="zeigen">
            <h2>User: {{ newUser.user }}</h2>
            <h2>Password: {{ newUser.password }}</h2>
        </div>
        </template>

        </div>
    </div>
</div>
</div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: 'registration',
        components: {
            //
        },

        data() {
            return {
                data: {
                username: ''
                }
            }
        },

        computed: {
            // get from index.js getters:
            ...mapGetters({
                newUser: 'newUser',
            }),
        },

        methods: {   
            insertUser() {
                //To create a new User -> send to index.js actions insertUser()
                try{
                 this.$store.dispatch('insertUser', this.data)
                } catch (error) {
                    console.log(error)
                }
            },
        },
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
	background: linear-gradient(to bottom, #ffffff, #c3c7c7, #588158);
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
.signup{
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
    width: 350px;
	height: 300px;
    display: flex;
	justify-content: center;
}

h2{
    color: rgb(0, 0, 0);
    display: flex;
	justify-content: center;

}
</style>