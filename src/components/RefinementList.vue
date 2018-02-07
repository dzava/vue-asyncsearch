<style>
</style>

<template>
    <div>
        <div class="as-refinement-list-item" v-for="option in options">
            <label class="as-refinement-list-label">
                <input type="checkbox" v-model="value" :value="option.value" class="as-refinement-list-checkbox">

                {{ option.label }}
            </label>
        </div>
    </div>
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
            defaultValue: {
                type: Array,
                default() {
                    return []
                },
            },
        },
    }
</script>
