const autoplay = {
    props: {
        /**
         * Flag to enable autoplay
         */
        autoplay: {
            type: Boolean,
            default: false,
        },
        /**
         * Time elapsed before advancing slide
         */
        autoplayTimeout: {
            type: Number,
            default: 2000,
        },
        /**
         * Flag to pause autoplay on hover
         */
        autoplayHoverPause: {
            type: Boolean,
            default: true,
        },
        /**
         * Restart the carousel when it reaches the end
         */
        autoplayLoop: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            autoplayInterval: null,
        }
    },
    destroyed() {
        if (!this.$isServer) {
            this.$el.removeEventListener("mouseenter", this.pauseAutoplay)
            this.$el.removeEventListener("mouseleave", this.startAutoplay)
        }
    },
    methods: {
        pauseAutoplay() {
            if (this.autoplayInterval) {
                this.autoplayInterval = clearInterval(this.autoplayInterval)
            }
        },
        startAutoplay() {
            if (this.autoplay) {
                this.autoplayInterval = setInterval(this.handleAutoplay, this.autoplayTimeout)
            }
        },
        handleAutoplay() {
            if ((this.currentPage >= this.pageCount - 1) && this.autoplayLoop) {
                this.goToPage(0)
            } else {
                this.advancePage()
            }
        }
    },
    mounted() {
        if (!this.$isServer && this.autoplayHoverPause) {
            this.$el.addEventListener("mouseenter", this.pauseAutoplay)
            this.$el.addEventListener("mouseleave", this.startAutoplay)
        }

        this.startAutoplay()
    },
}

export default autoplay