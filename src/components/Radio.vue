<style>
</style>

<template>
    <div>
        <div class="as-radio-item" v-for="option in options">
            <label class="as-radio-label">
                <input type="radio" v-model="value" :value="getValueForOption(option)" :name="name"
                       class="as-radio-radio">

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
                default() {
                    return ''
                },
            },
        },
    }
</script>
