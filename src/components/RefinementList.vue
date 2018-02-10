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
    import ParamMixin from '../mixins/ParamMixin'

    export default {
        mixins: [ParamMixin],
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
