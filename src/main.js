import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.scss'

import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  smooth: true,
  lerp: 0.08
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

new Vue({
  render: h => h(App)
}).$mount('#app')
