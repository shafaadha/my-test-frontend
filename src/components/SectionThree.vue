<template>
  <section class="section end">
    <h2 class="fade">Thank You</h2>
  </section>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default {
  name: 'ThankYouSection',
  mounted() {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(this.$el.querySelector('.fade'), {
      opacity: 0,
      y: 40,
      scrollTrigger: {
        trigger: this.$el,
        start: 'top 80%'
      }
    })
  }
}
</script>
