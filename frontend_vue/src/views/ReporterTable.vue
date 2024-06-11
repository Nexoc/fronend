<template>
 
    <div class="body">
        <div id="app" class="main">

            <img src="../assets/logo.png" alt="">
            <template v-if="authenticated">
                <form @submit.prevent="getAllReporter">
                    <div v-for="rep in reporterData.data.data" v-bind:key="rep"> 
                        <ul class="no-bullets">
                            <li>
                                <form @submit.prevent="">
                                    <div><h3>{{ reporterData.data.status }}</h3></div>

                                    <div class="title"><h2>Id: {{ rep.id }} </h2> </div>
                                                            
                                    <label for="first"> First name: {{ rep.first_name }}
                                    <input type="text" name="first" v-model=rep.first_name placeholder="first name" /> 
                                    </label>

                                    <label for="last"> Last name: {{ rep.last_name }}
                                    <input type="text" name="last" v-model=rep.last_name placeholder="last name" /> 
                                    </label>

                                    <label for="user"> Username: {{ rep.username  }}
                                    <input type="text" name="user" v-model=rep.username placeholder="username" />
                                    </label>

                                    <label for="lang"> Language code: {{ rep.language_code  }}
                                    <input type="text" name="lang" v-model=rep.language_code placeholder="language code" />
                                    </label>

                                    <label for="phone"> Phone number: {{ rep.phone_number  }}
                                    <input type="text" name="phone" v-model=rep.phone_number placeholder="phone number" />
                                    </label>

                                    <label for="email"> Email: {{ rep.email  }}
                                    <input type="text" name="email" v-model=rep.email placeholder="email" />
                                    </label>

                                    <button id='change' @click="changeReporterData(rep)">Change reporters data of reporter id number {{ rep.id }}</button>
                            </form>
                            </li>
                            
                        </ul>
                    </div>
                    <button id='find'>Show all reporters</button>
                </form>


            </template>

        </div>
    </div>

</template>

<script>
/* eslint-disable */
    import { mapGetters, createStore, } from "vuex";
    import axios from 'axios'
    import store from '../store/index'


    const reporterTable = createStore({

        namespaced: true,

        state: {
            data: null,
            status: null
        },

        getters: {},
        mutations: {
            getreporterData(state, data){
                //console.log('get rep data mutation')
                state.data = data
            },
            statusUpdate(state, repId){
                //console.log('mutation status ubdate rep table')

                state.status = 'Reporter id nummer '+repId+' has been updated'
            }
        },
        actions: {
            async getAllreporter( {commit} ){
                //console.log('rep table get all rep action')
                let response = await axios.get('reporters')
                //console.log(response.data)
                commit("getreporterData", response.data)
            },

            async changeReporterData( {commit}, rep ) {
                //console.log('rep table, get all rep action')
                const token = "Bearer " + localStorage.getItem("access_token");
                const headers = {'Authorization': token,
                                'accept': 'application/json'}
                if (rep.id !== null ) {
                    const newUserData = {
                        "first_name": rep.first_name,
                        "last_name": rep.last_name,
                        "username": rep.username,
                        "language_code": rep.language_code,
                        "phone_number": rep.phone_number,
                        "email": rep.email
                    }
                    try{

                        let response = await axios.patch('reporters?id=eq.' + rep.id, newUserData, {headers: headers})
  
                        commit("statusUpdate", rep.id)
                    } catch (error) {
                        //console.log('repo0rter table -> change rep data Token Error')                        
                        store.dispatch('refresh_token', error.response.status)
                    }    
                }
            }
        },
        })

    export default {
        name: 'reporter',
        components: {
            //
        },


        data() {
            return {    
                reporterData: {     
                    rep: {
                        id: null,
                        first_name:null,
                        lastname: null,
                        username:null,
                        language_code: null,
                        phine_number: null,
                        email: null,
                    },          
                    data: reporterTable.state,  
                },
            }
        },

        computed: {
                ...mapGetters({
                        authenticated: "authenticated",
                        user: "user",                                                                        
                }),            
        },

        methods: {   
            getAllReporter(){
                reporterTable.dispatch('getAllreporter') 
            },

            changeReporterData(rep){
                //console.log('change rep data')
                reporterTable.dispatch('changeReporterData', rep)
            }
        },

        mounted() {

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
	background: linear-gradient(to bottom, #ffffff, #ffffff, #b3eeb3);
}
.main{
	background: rgb(255, 255, 255);
	overflow: hidden;
    border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
    margin: 0 auto;
}
img{
	width: 325px;
    margin: 30px auto;
    display: flex;
	justify-content: center;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
input{
	width: 80%;
	height: 20px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 5px auto;
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
label {
  display:inline-block;
  width:32%; /* rounding error */
  margin-left: 5%;
  padding:0;
  white-space:nowrap;
}
h2{
    color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    margin: 30px auto;
}
h3{
    color: #025706;
    display: flex;
    justify-content: center;
    margin: 30px auto;
}
ul.no-bullets {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
li{
    color: #025706;
}
.title{
    background: rgb(219, 240, 224);
    border-radius: 40%;
	box-shadow: 5px 20px 30px rgb(86, 95, 86);
}
</style>