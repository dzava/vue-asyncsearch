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
            for (var k in this.searchStore.state.params) {
                let value = this.searchStore.state.params[k]
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
        http: new Http(),
        perPageOptions: [
            {label: '3 users', value: 3},
            {label: '5 users', value: 5},
            {label: '10 users', value: 10},
            {label: '12 users', value: 12},
        ],
        roleOptions: [
            {label: 'Administrators', value: 'admin'},
            {label: 'Moderators', value: 'moderator'},
            {label: 'Users', value: 'user'},
        ],
        statusOptions: [
            {label: 'All', value: ''},
            {label: 'Banned', value: 'banned'},
        ],
    },
    components: {AsyncSearch},
})
