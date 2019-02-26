<template>
    <component :is="tag" v-if="shouldRender">
        <slot :error="error">{{ error }}</slot>
    </component>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            tag: {
                type: String,
                default: 'div',
            },
            path: {
                type: String,
                default: '',
            },
        },
        computed: {
            shouldRender() {
                return this.searchStore.hasErrors()
            },
            error() {
                return this.searchStore.getError(this.path)
            },
        },
    }
</script>
