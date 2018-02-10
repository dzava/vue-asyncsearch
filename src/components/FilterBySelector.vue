<style>
</style>

<template>
    <select v-model="value">
        <option :value="option.value" v-for="option in options">
            {{ option.label }}
        </option>
    </select>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'

    export default {
        mixins: [ParamMixin],
        props: {
            options: {
                type: Array,
                required: true,
            },
        },
    }
</script>
