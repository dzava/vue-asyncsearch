import {obj_get} from './utils'

const pickBy = require('lodash.pickby')

export default class SearchStore {
    constructor(url, options = {}) {
        this._url = url
        this._results = []
        this._stoppedCounter = 1
        this._paramDefaults = {}
        this._pagination = {last_page: 0, current_page: 1}

        this.isFirstLoad = true
        this.isLoading = false
        this.state = {params: {}}

        this._options = Object.assign({
            pagination: {last_page: 'last_page', current_page: 'current_page'},
        }, options)
    }

    get _http() {
        return this._options.http || window.axios
    }

    addQueryParam(name, value) {
        if (this.state.params[name] !== undefined) {
            return
        }

        this.state.params = Object.assign({}, this.state.params, {[name]: value})

        this._paramDefaults[name] = value
    }

    setQueryParam(name, value) {
        this.guardAgainstUnknownParam(name)
        this.stop()

        this.state.params[name] = value

        this.start()
        this.search()
    }

    getQueryParam(name) {
        this.guardAgainstUnknownParam(name)

        return this.state.params[name]
    }

    resetQueryParam(param) {
        this.guardAgainstUnknownParam(param)
        this.stop()

        this.state.params[param] = this._paramDefaults[param]

        this.start()
    }

    clear() {
        this.stop()

        for (const param in this.state.params) {
            if (!this.state.params.hasOwnProperty(param)) {
                continue
            }

            this.resetQueryParam(param)
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

        const params = pickBy(this.state.params, f => f)

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

    guardAgainstUnknownParam(param) {
        if (this.state.params[param] === undefined) {
            throw new Error(`No such parameter '${param}', call 'registerQueryParam' first`)
        }
    }
}
