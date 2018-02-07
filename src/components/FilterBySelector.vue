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
    import FilterMixin from '../mixins/FilterMixin'

    export default {
        mixins: [FilterMixin],
        props: {
            options: {
                type: Array,
                required: true,
            },
        },
    }
</script>
