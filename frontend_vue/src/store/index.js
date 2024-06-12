import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

    namespaced: true,

    state: {        
        access_token: null, 
        refresh_token: null,
        isAuthenticated: null,
        signUpError: null
    },

    getters: {
        authenticated (state){
            return state.access_token
        }, 
        newUser (state) {
          let newUser = {
            "access_token": state.access_token, 
            "refresh_token": state.refresh_token,                      
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
            state.signUpError = null
        },
        logOut (state) {
            // console.log('mutation Log Out')
            state.access_token = null
            state.refresh_token = null
        },
        insertUser (state, userData) {
            // console.log('mutation insert User')
            state.access_token = userData.accessToken
            state.refresh_token = userData.refreshToken
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
            "username": user.username,
            "password": user.password
          }
          try{
              // const responce = await this.$axios.get('/ADRESS');
              let response = await axios.post('/api/v1/auth/login', form)
              const userData = {
                "access_token": response.data.access_token,
                "refresh_token": response.data.refresh_token,
              }
              if (response.statusText == "OK") {
                localStorage.setItem("access_token", response.data.access_token)
                localStorage.setItem("refresh_token", response.data.refresh_token)
                commit('signUpToken', userData)
              } 
          } catch(error) {
              //console.log('signUp in index.js catched an error')
              console.log(error)
              commit('signUpError')
          }
        },


        /* eslint-disable */
        /* 
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
        */

        logOut({ commit }) {
          commit('logOut')
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        },

        // create | insert a new User
        async insertUser ({ commit }, user) {  // { dispatch, commit }
          const form = {
            "name": user.name,
            "email": user.email,
            "username": user.username,
            "password": user.password,
          }
          // TODO try catch
          let response = await axios.post('/api/v1/auth/register', form, {
            headers: {
              // remove headers
            }
          })

          if (response.status == 200) {           
            localStorage.setItem("access_token", response.data.accessToken)
            localStorage.setItem("refresh_token", response.data.refreshToken)
            }

          const userData = {
            "accessToken": response.data.accessToken,
            "refreshToken": response.data.refreshToken
          }
          commit('insertUser', userData)
        }

    },
  })

