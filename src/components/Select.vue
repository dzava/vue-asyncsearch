<script>
    import ParamMixin from '../mixins/ParamMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, ValueMixin()],

        render(h) {
            return h('select', {
                domProps: {value: this.value},
                on: {change: (event) => this.value = event.target.value},
            }, this.$slots.default)
        },
    }
</script>
