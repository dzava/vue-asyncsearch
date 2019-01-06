<script>
    import debounce from 'lodash.debounce'
    import ParamMixin from '../mixins/ParamMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, ValueMixin()],
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
            if (!this.$scopedSlots.default) {
                return ''
            }

            return this.$scopedSlots.default({
                value: this.value,
                setValue: this.setValue(),
            })
        },
    }
</script>
