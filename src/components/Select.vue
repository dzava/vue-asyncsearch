<style>
</style>

<template>
    <select v-model="value">
        <option :value="getValueForOption(option)" v-for="option in options">
            {{ getLabelForOption(option) }}
        </option>
    </select>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import OptionsMixin from '../mixins/OptionsMixin'

    export default {
        mixins: [ParamMixin, OptionsMixin],
    }
</script>
