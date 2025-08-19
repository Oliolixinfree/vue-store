import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import './assets/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import FavoritesPage from './pages/FavoritesPage.vue'
import ProfilePage from './pages/ProfilePage.vue'

const app = createApp(App)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
