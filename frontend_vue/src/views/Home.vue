<template>
<div class="body">
  <div id="app" class="main">
    <img src="../assets/logo.png" alt="">
    <template v-if="true">
        <h2>Correct reporters</h2>
        
        <form @submit.prevent="getReporter">

            <div id='reporter'>
                <h3>{{ data.data.errorReporterId }}</h3>
                <h3>{{ data.data.reporterStatus }}</h3>
                <label for="ID">{{ data.reporterId }}</label>
                <input 
                type="text" 
                name="reporterID" 
                v-model="data.reporterId"
                placeholder="Reporter ID"       
                /> 
            </div>

            <button id='find'>Insert User ID</button>
        </form>

                <template v-if="data.data.requestStatus > 299">
                        <h3> style="color:red">Something wrong. Request came back with status {{ data.data.requestStatus }}</h3>
                </template>

                <template v-if="data.data.requestStatus < 299 && data.data.requestStatus > 0">
                        <h2> Data Base was updated with status {{ data.data.requestStatus }} </h2>
                </template>



        <template v-if="data.data.reporterID">

            <form @submit.prevent="newReporterData">

                <div id='first'>
                    <label for="first">First name: {{ data.data.first_name }}</label>
                    <input type="text" name="first" v-model=data.data.first_name /> 
                </div>

                <div id='last'>
                    <label for="last">Last name: {{ data.data.last_name }}</label>
                    <input type="text" name="last" v-model=data.data.last_name /> 
                </div>

                <div id='email'>
                    <label for="email">Email: {{ data.data.email }}</label>
                    <input type="text" name="last" v-model=data.data.email /> 
                </div>

                <div id='full'>
                    <label for="full">Fullname: {{ data.data.username }}</label>
                    <input type="text" name="full" v-model=data.data.username /> 
                </div>

                <div id='lang'>
                    <label for="lang">Language code: {{ data.data.language_code }}</label>
                    <input type="text" name="lang" v-model=data.data.language_code /> 
                </div>

                <div id='phone'>
                    <label for="phone">Phone number {{ data.data.phone_number }}</label>
                    <input type="text" name="phone" v-model=data.data.phone_number /> 
                </div>

                <button id='correct'>Correct User Data</button>

            </form>

        </template>

    </template>
    </div>
</div>
</template>


<script>
    import { mapGetters, createStore } from "vuex";
    import axios from 'axios'
    import store from '../store/index'

    const reporterStore = createStore({

        namespaced: true,

        state: {
            reporterID: null, 
            first_name: null,
            last_name: null,
            username: null,
            language_code: null,
            phone_number:null,
            requestStatus: null,
            reporterStatus: null,
            errorReporterId: null,
            email: null,
        },

        getters: {
            getData (state){
                let data = {
                    "reporterId": state.reporterID,
                    "first_name": state.first_name,
                    "last_name": state.last_name,
                    "username": state.username,
                    "language_code": state.language_code,
                    "phone_number": state.phone_number,
                    "email": state.email,
                }
                return data                   
            }, 

            requestStatus (state){
                return state.requestStatus
            },
            errorReporterId(state) {
                return state.errorReporterId
            }
        },

        mutations: {
            getReporter (state, userData) {
                //console.log('mutation get Reporter')        
                state.reporterID = userData.id
                state.first_name = userData.first_name
                state.last_name = userData.last_name
                state.username = userData.username
                state.language_code = userData.language_code
                state.phone_number = userData.phone_number
                state.email = userData.email
                state.reporterStatus = null
                state.errorReporterId = null
            },
            reporterStatus(state, reporterID){
                state.reporterStatus = "No reporter with ID number: " + reporterID
                state.errorReporterId = null
                state.reporterID = null
                state.first_name = null
                state.last_name = null
                state.username = null
                state.language_code = null
                state.phone_number = null
                state.email=null
            },
            requestStatus(state, status) {
                state.requestStatus = status
            },
            errorReporterId(state, errorStatus, reporterId){
                //console.log('mutation error rep id')
                state.errorReporterId = "Please use digits. Reporter ID: " + reporterId + " Request status: " + errorStatus
                state.reporterStatus = null
                state.reporterID = null
                state.first_name = null
                state.last_name = null
                state.username = null
                state.language_code = null
                state.phone_number = null
                state.email = null
            }
        },

        actions: {

            // get reporter's data from DB per ID
            async getReporter({ commit }, user) {
                //console.log('action home get reporter')  
                if (user.reporterId !== null ) {
                    try {
                        let response = await axios.get('reporters?id=eq.' + user.reporterId)                        
                        if (response.statusText == "OK" && response.data.length > 0) {
                            commit('getReporter', response.data[0])
                        } else {
                            console.log("es gibt kein Reporter mit solchem ID")
                            commit('reporterStatus', user.reporterId)
                        }
                    } catch (error){
                        console.log(error)                       
                        commit('errorReporterId', error.response.status, user.reporterId)                       
                    }
                }
            },

            async newReporterData ({ commit }, user) {
                //console.log('action home new reporter data') 
                const token = "Bearer " + localStorage.getItem("access_token");
                const headers = {'Authorization': token,
                                'accept': 'application/json'}
                
                if (user.reporterID !== null ) {
                    // id, created_at, last_seen, first_name, last_name, username, language_code, phone_number
                    const newUserData = {
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "username": user.username,
                        "language_code": user.language_code,
                        "phone_number": user.phone_number,
                        "email": user.email
                    }
                    try{
                        let response = await axios.patch('reporters?id=eq.' + user.reporterID, newUserData, {headers: headers})

                        commit('requestStatus', response.status)  
                    } catch (error) {
                        //console.log(error)                      
                        store.dispatch('refresh_token', error.response.status)
                    }                  
                }
            },
        },
    })


    export default {
        namespaced: true,
        username: 'home',

        data() {
                return {
                    data: {
                        reporterID: null,
                        firstname: null,
                        userID: null,
                        last_name: null,
                        username: null,
                        language_code: null,
                        phone_number: null,  
                        email: null,   
                        data: reporterStore.state,                   
                    }
                }
        },

        computed: {
                ...mapGetters({
                        authenticated: "authenticated",
                        access_token: "access_token",
                        refresh_token: "refresh_token",
                        user: "user",                                                                        
                }), 
 
        },

        methods: {   
                getReporter() {
                        reporterStore.dispatch('getReporter', this.data).then(() => {
                            //
                        })
                },

                newReporterData() {
                    //console.log("method new rep data")
                    reporterStore.dispatch('newReporterData', reporterStore.state).then(() => {
                            //
                        })
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
	width: 60%;
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
label{
    margin: 5px auto;
	padding: 10px;
    color: rgb(0, 0, 0);
    display: flex;
	justify-content: center;
}
h2{
    color: rgb(0, 0, 0);
    display: flex;
    justify-content: center;
    margin: 30px auto;
}
h3{
    color: rgb(233, 1, 1);
    display: flex;
    justify-content: center;
    margin: 30px auto;
}
</style>