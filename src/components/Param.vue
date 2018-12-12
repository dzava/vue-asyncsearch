<script>
    import ParamMixin from '../mixins/ParamMixin'
    import debounce from 'lodash.debounce'

    export default {
        mixins: [ParamMixin],
        props: {
            delay: {
                type: Number,
                default: 0,
            },
        },
        methods: {
            setValue() {
                return debounce((val) => {
                    this.value = val
                }, this.delay)
            },
        },
        render() {
            return this.$scopedSlots.default({
                value: this.value,
                setValue: this.setValue(),
            })
        },
    }
</script>
