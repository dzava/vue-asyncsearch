<script>
    import ParamMixin from '../mixins/ParamMixin'

    export default {
        mixins: [ParamMixin],
        methods: {
            setValue(val) {
                this.value = val
            },
        },
        render() {
            return this.$scopedSlots.default({
                value: this.value,
                setValue: this.setValue,
            })
        },
    }
</script>
