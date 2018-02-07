import Vue from 'vue'
import AsyncSearch from '../src'
import Http from './Http'

Vue.use(AsyncSearch)

Vue.component('as-debug', {
    inject: ['searchStore'],
    template: '',
    computed: {
        url() {
            const params = new URLSearchParams()
            for (var k in this.searchStore.state.filters) {
                let value = this.searchStore.state.filters[k]
                if (!value) {
                    continue
                }

                if (Object.prototype.toString.call(value) === '[object Array]') {
                    value.forEach((v) => params.append(k + '[]', v))
                } else {
                    params.append(k, value)
                }

            }
            return `${this.searchStore._url}?` + params.toString().replace(/%5B/g, '[').replace(/%5D/g, ']')
        },
    },
})

new Vue({
    el: '#app',
    data: {
        storeConfig: {
            http: new Http(),
            pagination: {
                last_page: 'pagination.last_page',
                current_page: 'pagination.current_page',
                per_page: 'pagination.per_page',
            },
        },
    },
    components: {AsyncSearch},
})
