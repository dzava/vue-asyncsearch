<style>
</style>

<template>
    <div>
        <div class="as-checkbox-item" v-for="option in options">
            <label class="as-checkbox-label">
                <input type="checkbox" v-model="value" :value="getValueForOption(option)" class="as-checkbox-checkbox">

                {{ getLabelForOption(option) }}
            </label>
        </div>
    </div>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import OptionsMixin from '../mixins/OptionsMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, OptionsMixin, ValueMixin()],
        props: {
            defaultValue: {
                type: Array,
                default() {
                    return []
                },
            },
        },
    }
</script>
