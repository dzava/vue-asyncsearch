export default (name = 'value') => {
    return {
        computed: {
            [name]: {
                get() {
                    return this.searchStore.getQueryParam(this.name)
                },
                set(value) {
                    this.searchStore.stop()
                    this.resetParams.forEach(param => this.searchStore.resetQueryParam(param))
                    this.searchStore.start()

                    this.searchStore.setQueryParam(this.name, value)
                },
            },
        },
    }
}

