import {isArray, obj_get} from './utils'

const pickBy = require('lodash.pickby')

export default class SearchStore {
    constructor(url, options = {}) {
        this._url = url
        this._results = []
        this._stoppedCounter = 1
        this._pagination = {last_page: 0, current_page: 1}

        this.isFirstLoad = true
        this.isLoading = false
        this.state = {params: {}}

        this._options = Object.assign({
            pagination: {last_page: 'last_page', current_page: 'current_page'},
            refreshOnParamChange: true,
            useHistory: true,
            params: {},
        }, options)
    }

    get _http() {
        return this.getOption('http', window.axios)
    }

    addQueryParam(name, value, options) {
        if (this.state.params[name] !== undefined) {
            return this
        }

        this.state.params = Object.assign({}, this.state.params, {
            [name]: this.getParamValueFromUrl(name, value),
        })

        this._options.params[name] = Object.assign({
            refreshOnChange: this.getOption('refreshOnParamChange'),
            default: value,
        }, options)

        return this
    }

    setQueryParam(name, value) {
        this.guardAgainstUnknownParam(name)

        if (this.state.params[name] === value) {
            return this
        }

        this.state.params[name] = value

        /* Determine if we should refresh the results because
         * of a change in this params value
         */
        if (this.getOption(`params.${name}.refreshOnChange`)) {
            this.refresh()
        }

        return this
    }

    getQueryParam(name) {
        this.guardAgainstUnknownParam(name)

        return this.state.params[name]
    }

    resetQueryParam(param) {
        this.guardAgainstUnknownParam(param)

        this.setQueryParam(param, this.getOption(`params.${param}.default`))
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
        this.refresh()
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

    refresh() {
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

    getOption(name, def = undefined) {
        const value = obj_get(this._options, name, def)

        if (value === undefined) {
            throw new Error(`No such option '${name}'`)
        }

        return value
    }

    _submit() {
        this.stop()
        this.isLoading = true

        const params = pickBy(this.state.params, f => f)
        this.updateHistory(params)

        return this._http.get(this._url, {params})
            .then(({data}) => {
                this.isLoading = false
                this.isFirstLoad = false
                this.start()

                return data
            })
            .catch(error => {
                this.isLoading = false
                this.start()

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

    getParamValueFromUrl(param, def) {
        if (!this.getOption('useHistory')) {
            return def
        }

        let searchParams = new URLSearchParams(location.search)
        let value = searchParams.get(param)

        if (isArray(def)) {
            value = searchParams.getAll(param)
        }

        return Number(value) || value || def
    }

    updateHistory(params) {
        if (!this.getOption('useHistory')) {
            return
        }

        let searchParams = new URLSearchParams()
        for (let name in params) {
            if (!params.hasOwnProperty(name)) {
                continue
            }

            const value = params[name]
            if (isArray(value)) {
                value.forEach(v => searchParams.append(name, v))
            } else {
                searchParams.append(name, value)
            }
        }

        window.history.replaceState({}, '', `${location.pathname}?${searchParams}`)
    }

    guardAgainstUnknownParam(param) {
        if (this.state.params[param] === undefined) {
            throw new Error(`No such parameter '${param}', call 'addQueryParam' first`)
        }
    }
}
