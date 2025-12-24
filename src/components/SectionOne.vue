<template>
  <section class="section hero" ref="section">
    <div class="grid-container">

      <div class="left">
        <div class="tab-list">
          <div v-for="(tab, i) in tabs" :key="i" class="tab-item" :class="{ active: activeIndex === i }"
            @click="goToStep(i)">
            {{ tab }}
          </div>
        </div>

        <div class="content-list">
          <div v-for="(item, i) in contents" :key="i" class="content-item" :ref="el => contentRefs[i] = el">
            <h2>{{ item.title }}</h2>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="img-counter">
          <div class="img-counter">
            <span class="current">{{ activeIndex + 1 }}</span>
            <span class="divider">/</span>
            <span class="total">{{ contents.length }}</span>
          </div>
        </div>
        <div class="img-mask">
          <img v-for="(img, i) in images" :key="i" :src="img" class="hero-img" :ref="el => imageRefs[i] = el" />
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
  name: 'SectionOne',

  data() {
    return {
      activeIndex: 0,
      tabs: ['plan', 'design', 'build'],

      contents: [
        {
          title: 'The sitemap of the experience',
          desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.'
        },
        {
          title: 'Time to paint the room walls',
          desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.'
        },
        {
          title: 'Magic happens to build out',
          desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.'
        }
      ],

      images: [
        require('@/assets/images/table.jpg'),
        require('@/assets/images/room.jpg'),
        require('@/assets/images/people.jpg')
      ],

      contentRefs: [],
      imageRefs: [],
      scrollTrigger: null
    }
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    this.contentRefs.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 40
      })
    })

    this.imageRefs.forEach((img, i) => {
      gsap.set(img, {
        opacity: i === 0 ? 1 : 0,
        scale: 1.1
      })
    })

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.$refs.section,
      start: 'top top',
      end: () => `+=${this.contents.length * window.innerHeight}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        const index = Math.min(
          this.contents.length - 1,
          Math.floor(self.progress * this.contents.length)
        )
        this.changeActive(index)
      }
    })
  },

  methods: {
    changeActive(index) {
      if (this.activeIndex === index) return

      gsap.to(this.contentRefs[this.activeIndex], {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.fromTo(
        this.contentRefs[index],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }
      )

      gsap.fromTo(
        this.$refs.counterCurrent,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 }
      )

      gsap.to(this.imageRefs[this.activeIndex], {
        opacity: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      })

      gsap.to(this.imageRefs[index], {
        opacity: 1,
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out'
      })

      this.activeIndex = index
    },

    goToStep(index) {
      const y =
        this.scrollTrigger.start +
        index * window.innerHeight

      gsap.to(window, {
        scrollTo: y,
        duration: 1,
        ease: 'power2.out'
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/styles/section-one.scss';
</style>
