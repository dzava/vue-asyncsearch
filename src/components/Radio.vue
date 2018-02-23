<style>
</style>

<template>
    <div>
        <div class="as-radio-item" v-for="option in options">
            <label class="as-radio-label">
                <input type="radio" v-model="value" :value="option.value" :name="name" class="as-radio-radio">

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
                default() {
                    return ''
                },
            },
        },
    }
</script>
