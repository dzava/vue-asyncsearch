<style>
</style>

<template>
    <nav class="as-pagination" v-if="total > 1">
        <slot :current="current" :total="total" :page="page">
            <a href="#"
               class="as-pagination-item"
               :class="{ 'active': current === p }"
               v-for="p in total"
               @click.prevent="page(p)">
                {{ p }}
            </a>
        </slot>
    </nav>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import PaginationMixin from '../mixins/PaginationMixin'

    export default {
        mixins: [ParamMixin, PaginationMixin],
        methods: {
            page(page) {
                this.value = page
            },
        },
    }
</script>
