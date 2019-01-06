<template>
    <input type="checkbox" v-model="theValue" :value="value" class="as-checkbox-checkbox">
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, ValueMixin('theValue')],
        props: {
            defaultValue: {
                type: Array,
                default() {
                    return []
                },
            },
            value: {
                type: String,
                required: true,
            },
            checked: {
                type: Boolean,
                default: false,
            },
        },
        created() {
            if (!this.checked) {
                return
            }
            let defaultValue = this.searchStore.getDefaultValue(this.name)

            defaultValue.push(this.value)

            this.searchStore.setDefaultValue(this.name, defaultValue)
        },
    }
</script>
