<style>

</style>

<template>
    <div>
        <slot :value="value" :setValue="setValue"></slot>
    </div>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'

    export default {
        mixins: [ParamMixin],
        methods: {
            setValue(val) {
                this.value = val
            }
        }
    }
</script>
