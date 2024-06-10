import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Registration from '../views/Registration'
import ReporterTable from '../views/ReporterTable'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
    {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
    {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/reporter',
    name: 'reporter',
    component: ReporterTable
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
