import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

    namespaced: true,

    state: {
        access_token: null, 
        refresh_token: null,
        user: null, // sign up user name
        password: null,
        signUpError: null
    },

    getters: {
        authenticated (state){
            return state.access_token && state.user
        }, 
        user (state) {
            return state.user
        },
        newUser (state) {
          let newUser = {
            "user": state.user,
            "password": state.password
          }
          return   newUser
        },
        access_token (state) {
          return state.access_token
        },
        refresh_token(state) {
          return state.refresh_token
        },
        signUpError(state){
          return state.signUpError
        }
    },

    mutations: {
        signUpToken (state, userData) {
            state.access_token = userData.access_token
            state.refresh_token = userData.refresh_token
            state.user = userData.username
            state.signUpError = null
        },
        logOut (state) {
            //console.log('mutation Log Out')
            state.access_token = null
            state.refresh_token = null
            state.user = null
        },
        insertUser (state, userData) {
            //console.log('mutation insert User')
            state.user = userData.username
            state.password = userData.password
        },
        signUpError(state) {
            //console.log('mutation sign up Error') 
            state.signUpError = 'Username or passwort are wrong'
        }
    },

    actions: {
        
        async signUp ({ commit }, user) {  // { dispatch}
          //console.log('action signUp')
          const form = {
            "iusername": user.username,
            "ipassword": user.password
          }
          try{
              let response = await axios.post('/rpc/authenticate', form)
              const userData = {
                "access_token": response.data.access_token,
                "refresh_token": response.data.refresh_token,
                "username": user.username
              }
              if (response.statusText == "OK") {
                localStorage.setItem("access_token", response.data.access_token)
                localStorage.setItem("refresh_token", response.data.refresh_token)
                localStorage.setItem("user", user.username)
                commit('signUpToken', userData)
              } 
          } catch(error) {
              //console.log('signUp in index.js catched an error')
              console.log(error)
              commit('signUpError')
          }
        },

        async refresh_token ( {commit} , error) {
          //console.log("index action refresh token")
          //console.log(error)
          const refresh_token = "Bearer " + localStorage.getItem("refresh_token")
          const headers = {'Authorization': refresh_token}               
          try{
            let response = await axios.post('/rpc/refresh',null ,{headers: headers})
            //console.log(response)
            const access_token = response.data.access_token
            const refresh_token = response.data.refresh_token
            if (response.statusText == "OK") {
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)
                //console.log(" new access token!!! " + localStorage.getItem("access_token"))
          }   
          }catch (error){
            console.log(error)
            //console.log('log Out')
            commit('logOut')
          }     
        },

        token_storage ( { commit } ) {
          // console.log("index.js token_storage function")
          const userData = {
            "access_token": localStorage.getItem('access_token'),
            "refresh_token": localStorage.getItem('refresh_token'),
            "username": localStorage.getItem('user')
          }
          commit('signUpToken', userData)
        },

        logOut({ commit }) {
          commit('logOut')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('user')
        },

        // create | insert a new User
        async insertUser ({ commit }, user) {  // { dispatch, commit }
          //console.log('action insertUser')
          //console.log(user.username)
          const form = {
            "iusername": user.username
          }
          let response = await axios.post('/rpc/register', form)
          const userData = {
            "username": user.username,
            "password": response.data.password
          }
          commit('insertUser', userData)
        },

    },
  })