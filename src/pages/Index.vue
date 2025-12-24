<template>
    <div class="page">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
    </div>
</template>

<script>
import SectionOne from '@/components/SectionOne.vue';
import SectionTwo from '@/components/SectionTwo.vue';
import SectionThree from '@/components/SectionThree.vue';
import Lenis from '@studio-freight/lenis'

export default {
    name: 'IndexPage',
    components: {
        SectionOne,
        SectionTwo,
        SectionThree
    },

    mounted() {
        const lenis = new Lenis({ smooth: true })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }
}
</script>
