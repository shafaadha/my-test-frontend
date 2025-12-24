<template>
    <section class="pin-section">
        <div class="pin-wrapper">

            <div class="progress"></div>

            <div class="content">
                <div class="number">
                    <span ref="current">1</span> - <span>3</span>
                </div>
                <div class="title-wrap">
                    <div class="list-title">
                        <div class="title-item">plan</div>
                        <div class="title-item">design</div>
                        <div class="title-item">build</div>
                    </div>

                </div>
                <a class="button w-button" href="#">Learn More</a>

            </div>

            <div class="img-stack">
                <img v-for="(img, i) in images" :key="i" :src="img" class="stack-img" :style="{ zIndex: i + 1 }" />
            </div>

        </div>
    </section>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default {
    name: 'PinnedStackImages',
    data() {
        return {
            images: [
                require('@/assets/images/table.jpg'),
                require('@/assets/images/room.jpg'),
                require('@/assets/images/people.jpg')
            ]
        }
    },
    mounted() {
        gsap.registerPlugin(ScrollTrigger)

        const images = this.$el.querySelectorAll('.stack-img')
        const progressBar = this.$el.querySelector('.progress')
        const currentNumber = this.$refs.current
        const total = images.length
        const titles = this.$el.querySelectorAll('.title-item')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.$el,
                start: 'top top',
                end: '+=300%',
                scrub: true,
                pin: this.$el.querySelector('.pin-wrapper'),
                anticipatePin: 1,
                onUpdate: self => {
                    progressBar.style.width = `${self.progress * 100}%`

                    const index = Math.min(
                        total,
                        Math.floor(self.progress * total) + 1
                    )

                    currentNumber.textContent = index

                    titles.forEach((t, i) => {
                        if (i === index - 1) {
                            gsap.to(t, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' })
                        } else {
                            gsap.to(t, { opacity: 0, y: 50, duration: 0.3, ease: 'power1.out' })
                        }
                    })

                    const listHeight = this.$el.querySelector('.list-title').offsetHeight
                    const itemHeight = titles[0].offsetHeight
                    const translateY = -((index - 1) * itemHeight) + (listHeight / 2 - itemHeight / 2)

                    gsap.to(this.$el.querySelector('.list-title'), {
                        y: translateY,
                        duration: 0.3,
                        ease: 'power1.out'
                    })
                }
            }
        })



        images.forEach((img, i) => {
            if (i !== 0) gsap.set(img, { opacity: 0, width: 0 })

            tl.to(img, { opacity: 1, duration: 0.01 })
                .fromTo(img, { scale: 0.3 }, { scale: 1.2, duration: 1, ease: 'none' })
        })
    }
}
</script>

<style scoped>
@import '@/assets/styles/section-two.scss';
</style>