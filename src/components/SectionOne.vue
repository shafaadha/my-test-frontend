<template>
  <section class="section hero">
    <h1>Scrolling Header</h1>
  </section>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SectionOne',
  mounted() {
    gsap.from(this.$el.querySelector('h1'), {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
  }
}
</script>

<style scoped>
@import '@/assets/styles/section-one.scss';
</style>