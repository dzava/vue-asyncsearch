import {obj_get} from './utils'

const pickBy = require('lodash.pickby')

export default class SearchStore {
    constructor(url, options = {}) {
        this._url = url
        this._results = []
        this._stoppedCounter = 1
        this._filterDefaults = {}
        this._pagination = {last_page: 0, current_page: 1}

        this.isFirstLoad = true
        this.isLoading = false
        this.state = {filters: {}}

        this._options = Object.assign({
            pagination: {last_page: 'last_page', current_page: 'current_page'},
        }, options)
    }

    get _http() {
        return this._options.http || window.axios
    }

    registerFilter(name, value) {
        if (this.state.filters[name] !== undefined) {
            return
        }

        this.state.filters = Object.assign({}, this.state.filters, {[name]: value})

        this._filterDefaults[name] = value
    }

    setFilter(name, value) {
        this.guardAgainstUnknownFilter(name)
        this.stop()

        this.state.filters[name] = value

        this.start()
        this.search()
    }

    getFilter(name) {
        this.guardAgainstUnknownFilter(name)

        return this.state.filters[name]
    }

    resetFilter(filter) {
        this.guardAgainstUnknownFilter(filter)
        this.stop()

        this.state.filters[filter] = this._filterDefaults[filter]

        this.start()
    }

    clear() {
        this.stop()

        for (const filter in this.state.filters) {
            if (!this.state.filters.hasOwnProperty(filter)) {
                continue
            }

            this.resetFilter(filter)
        }

        this.start()
        this.search()
    }

    start() {
        if (this._stoppedCounter < 1) {
            this._stoppedCounter = 0
        } else {
            this._stoppedCounter--
        }
    }

    stop() {
        this._stoppedCounter++
    }

    search() {
        if (this._stoppedCounter !== 0) {
            return
        }

        return this._submit().then(data => {
            this._results = data.data
            this.pagination = data

            return data
        })
    }

    loadMore() {
        return this._submit().then(data => {
            this._results = this._results.concat(data.data)
            this.pagination = data

            return data
        })
    }

    _submit() {
        this.isLoading = true

        const params = pickBy(this.state.filters, f => f)

        return this._http.get(this._url, {params})
            .then(({data}) => {
                this.isLoading = false
                this.isFirstLoad = false
                return data
            })
            .catch(error => {
                this.isLoading = false

                return error
            })
    }

    set pagination(data) {
        for (const key in this._pagination) {
            if (!this._pagination.hasOwnProperty(key)) {
                continue
            }

            this._pagination[key] = obj_get(data, this._options.pagination[key], this._pagination[key])
        }
    }

    get pagination() {
        return this._pagination
    }

    get results() {
        return this._results
    }

    set results(value) {
        this._results = value
    }

    guardAgainstUnknownFilter(filter) {
        if (this.state.filters[filter] === undefined) {
            throw new Error(`No such filter '${filter}', call 'registerFilter' first`)
        }
    }
}
