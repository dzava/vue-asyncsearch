<style>
</style>

<template>
    <input type="radio" v-model="theValue" :value="value" :name="name">
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, ValueMixin('theValue')],
        props: {
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

            this.searchStore.setQueryParam(this.name, this.value)
        },
    }
</script>
