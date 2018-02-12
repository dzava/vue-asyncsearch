import Store from '../src/SearchStore'

let store

describe('SearchStore', () => {
    beforeEach(() => {
        store = new Store('test.example.com/users')
        store.addQueryParam('name', 'John')
    })

    it('can accept a custom http instance in options', () => {
        const http = jest.fn()

        store = new Store('/users', {http})

        expect(store._http).toBe(http)

        window.axios = {defaults: {baseURL: 'not-a-real-axios'}}
        store = new Store('/users')

        expect(store._http.defaults.baseURL).toBe('not-a-real-axios')
    })

    it('can accept pagination configuration in options', () => {
        store = new Store('/users', {
            pagination: {last_page: 'total_pages', current_page: 'page'},
        })

        expect(store.pagination).toEqual({last_page: 0, current_page: 1})

        store.pagination = {total_pages: 3, page: 2}

        expect(store.pagination).toEqual({last_page: 3, current_page: 2})
    })

    it('can add a new param', () => {
        store.addQueryParam('role', 'developer', {refreshOnChange: false})

        expect(store.getQueryParam('role')).toBe('developer')
        expect(store.getOption('params.role.refreshOnChange')).toBe(false)
        expect(store.getOption('params.name.refreshOnChange')).toBe(true)
    })

    it('can set a params value', () => {
        expect(store.getQueryParam('name')).toBe('John')

        store.setQueryParam('name', 'John Doe')

        expect(store.getQueryParam('name')).toBe('John Doe')
    })

    it('can reset a param to the default value', () => {
        store.setQueryParam('name', 'John Doe')
        expect(store.getQueryParam('name')).toBe('John Doe')

        store.resetQueryParam('name')
        expect(store.getQueryParam('name')).toBe('John')
    })

    it('can reset all params', () => {
        store.addQueryParam('role', 'user')
        store.setQueryParam('role', 'developer')
        store.setQueryParam('name', 'John Doe')

        store.clear()

        expect(store.getQueryParam('name')).toBe('John')
        expect(store.getQueryParam('role')).toBe('user')
    })

    it('throws when setting an unknown param', () => {
        expect(() => {
            store.setQueryParam('unknown', 'value')
        }).toThrow()
    })

    it('throws when retrieving an unknown param', () => {
        expect(() => {
            store.getQueryParam('unknown')
        }).toThrow()
    })

    it('will update the results and pagination on refresh', async () => {
        const http = getHttpMock({
            data: [{name: 'John Doe'}, {name: 'John Roe'}],
            last_page: 5,
            current_page: 3,
        })
        store = new Store('/users', {http})
        expect(store.results).toEqual([])

        store.start()
        await store.refresh()

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {}})
        expect(store.results).toEqual([{name: 'John Doe'}, {name: 'John Roe'}])
        expect(store.pagination).toEqual({last_page: 5, current_page: 3})

    })

    it('will append the results on load more', async () => {
        const http = getHttpMock({data: [{name: 'John Doe'}, {name: 'John Roe'}]})
        store = new Store('/users', {http})
        store._results = [{name: 'Jane Doe'}]

        store.start()
        await store.loadMore()

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {}})
        expect(store.results).toEqual([{name: 'Jane Doe'}, {name: 'John Doe'}, {name: 'John Roe'}])
    })

    it('will pass the parameters to the http client on refresh', async () => {
        const http = getHttpMock()
        store = new Store('/users', {http})
        store.addQueryParam('first_name', 'Jane')
        store.addQueryParam('last_name', 'Doe')

        store.start()
        await store.loadMore()

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {first_name: 'Jane', last_name: 'Doe'}})
    })

    it('refreshes only once while resetting multiple params', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.addQueryParam('role', 'user')
        store.start()

        store.clear()

        expect(http.get).toHaveBeenCalledTimes(1)
    })

    it('will refresh when a param value changes', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.addQueryParam('name', 'John')
        store.start()

        store.setQueryParam('name', 'Jane')

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {name: 'Jane'}})
    })

    it('can disable refresh on change for each param individually', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.addQueryParam('name', 'John', {refreshOnChange: false})
        store.start()

        store.setQueryParam('name', 'Jane')

        expect(http.get).toHaveBeenCalledTimes(0)
    })

    it('will not refresh when a param changes and refreshOnParamChange is false', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http, refreshOnParamChange: false})
        store.addQueryParam('name', 'John')
        store.start()

        store.setQueryParam('name', 'Jane')

        expect(http.get).toHaveBeenCalledTimes(0)
    })
})

const getHttpMock = (data = {data: []}) => {
    const getMock = jest.fn()
    getMock.mockReturnValue(new Promise((resolve, reject) => {
        resolve({data})
    }))

    const mock = jest.fn().mockImplementation(() => {
        return {get: getMock}
    })

    return new mock()
}
