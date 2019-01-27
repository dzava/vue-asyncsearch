import Store from '../src/SearchStore'

let store

describe('SearchStore', () => {
    beforeEach(() => {
        window.history.replaceState({}, '', '?')
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

    it('can change a params default value', () => {
        store.setQueryParam('name', 'John Doe')
        expect(store.getQueryParam('name')).toBe('John Doe')

        store.resetQueryParam('name')
        expect(store.getQueryParam('name')).toBe('John')

        store.setDefaultValue('name', 'Jane')
        expect(store.getQueryParam('name')).toBe('John')

        store.resetQueryParam('name')
        expect(store.getQueryParam('name')).toBe('Jane')
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
        expect(store.getResults()).toEqual([])

        store.start()
        await store.refresh()

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {}})
        expect(store.getResults()).toEqual([{name: 'John Doe'}, {name: 'John Roe'}])
        expect(store.pagination).toEqual({last_page: 5, current_page: 3})

    })

    it('will append the results on load more', async () => {
        const http = getHttpMock({data: [{name: 'John Doe'}, {name: 'John Roe'}]})
        store = new Store('/users', {http})
        // store._results = [{name: 'Jane Doe'}]
        store._responses = [{data: [{name: 'Jane Doe'}]}]

        store.start()
        await store.loadMore()

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('/users', {params: {}})
        expect(store.getResults()).toEqual([{name: 'Jane Doe'}, {name: 'John Doe'}, {name: 'John Roe'}])
    })

    it('can use a different path to retrieve the results', async () => {
        const http = getHttpMock({
            data: {users: [{name: 'John Doe'}, {name: 'John Roe'}]},
            last_page: 5,
            current_page: 3,
        })
        store = new Store('/users', {http})
        expect(store.getResults('data.users')).toEqual([])

        store.start()
        await store.refresh()

        expect(store.getResults('data.users')).toEqual([{name: 'John Doe'}, {name: 'John Roe'}])
    })

    it('will use the entire response as results if the results path is empty', async () => {
        const http = getHttpMock([{name: 'John Doe'}, {name: 'John Roe'}])
        store = new Store('/users', {http})
        expect(store.getResults()).toEqual([])

        store.start()
        await store.refresh()

        expect(store.getResults('')).toEqual([{name: 'John Doe'}, {name: 'John Roe'}])
    })

    it('supports object _responses', async () => {
        const http = getHttpMock({users: [{name: 'John Doe'}, {name: 'John Roe'}], posts: [{title: 'Who is John Doe'}]})
        store = new Store('/users', {http})
        expect(store.getResults('')).toEqual([])

        store.start()
        await store.refresh()

        expect(store.getResults('')).toEqual([
            ['users', [{name: 'John Doe'}, {name: 'John Roe'}]],
            ['posts', [{title: 'Who is John Doe'}]],
        ])
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

    it('will not refresh when resetting a param if the current value is the default', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.addQueryParam('name', 'John')
        store.start()

        store.resetQueryParam('name')

        expect(http.get).toHaveBeenCalledTimes(0)
    })

    it('will refresh when a param value changes', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.refresh = jest.fn()
        store.addQueryParam('name', 'John')
        store.start()

        store.setQueryParam('name', 'John')
        store.setQueryParam('name', 'Jane')

        expect(store.refresh).toHaveBeenCalledTimes(1)
    })

    it('will not refresh when setting the param value if the new value is the same with the old', () => {
        const http = getHttpMock()
        store = new Store('/users', {http: http})
        store.addQueryParam('name', 'John')
        store.start()

        store.setQueryParam('name', 'John')

        expect(http.get).toHaveBeenCalledTimes(0)
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

    describe('History', () => {

        it('will initialize from the url query params when useHistory is true', () => {
            window.history.pushState({}, '', '?first_name=Jane&roles[]=admin&roles[]=moderator&page=2')
            store = new Store('/users', {useHistory: true})
            store.addQueryParam('first_name', 'John')
                .addQueryParam('last_name', 'Doe')
                .addQueryParam('roles[]', [])
                .addQueryParam('status[]', ['published'])
                .addQueryParam('page', 1)

            expect(store.getQueryParam('first_name')).toBe('Jane')
            expect(store.getQueryParam('last_name')).toBe('Doe')
            expect(store.getQueryParam('roles[]')).toEqual(['admin', 'moderator'])
            expect(store.getQueryParam('status[]')).toEqual(['published'])
            expect(store.getQueryParam('page')).toBe(2)
        })

        it('will update the url when useHistory is true', () => {
            const http = getHttpMock()
            store = new Store('/users', {http, refreshOnParamChange: false, useHistory: true})
            store.addQueryParam('first_name', '')
                .addQueryParam('last_name', '')
                .addQueryParam('roles[]', [])
                .start()
            expect(window.location.search).toBe('')

            store.setQueryParam('first_name', 'John')
                .setQueryParam('last_name', 'Doe')
                .setQueryParam('roles[]', ['admin', 'moderator'])
                .refresh()

            expect(window.location.search).toBe(encodeURI('?first_name=John&last_name=Doe&roles[]=admin&roles[]=moderator'))
        })

        it('will not initialize from the url query params when useHistory is false', () => {
            window.history.pushState({}, '', '?first_name=Jane')
            store = new Store('/users', {useHistory: false})
            store.addQueryParam('first_name', 'John')

            expect(store.getQueryParam('first_name')).toBe('John')
        })

        it('will not update the url when useHistory is false', () => {
            const http = getHttpMock()
            store = new Store('/users', {http, refreshOnParamChange: false, useHistory: false})
            store.addQueryParam('first_name', '')
                .addQueryParam('last_name', '')
                .addQueryParam('roles[]', [])
                .start()
            expect(window.location.search).toBe('')

            store.setQueryParam('first_name', 'John')
                .setQueryParam('last_name', 'Doe')
                .setQueryParam('roles[]', ['admin', 'moderator'])
                .refresh()

            expect(window.location.search).toBe('')
        })

        it('will not update the url with params whose value is the default one', () => {
            const http = getHttpMock()
            store = new Store('/users', {http, refreshOnParamChange: false, useHistory: true})
            store.addQueryParam('first_name', '')
                .addQueryParam('last_name', 'Doe')
                .start()

            store.setQueryParam('first_name', 'John')
                .refresh()

            expect(window.location.search).toEqual('?first_name=John')
        })

        it('will not update the url with a param that has set addToUrl to false', () => {
            const http = getHttpMock()
            store = new Store('/users', {http, refreshOnParamChange: false, useHistory: true})
            store.addQueryParam('first_name', '', {addToUrl: false})
                .addQueryParam('last_name', '')
                .start()
            expect(window.location.search).toEqual('')

            store.setQueryParam('first_name', 'John')
                .setQueryParam('last_name', 'Doe')
                .refresh()

            expect(window.location.search).toEqual('?last_name=Doe')
        })
    })
})

const getHttpMock = (data = {data: []}) => {
    const getMock = jest.fn()
    getMock.mockReturnValue(new Promise((resolve) => {
        resolve({data})
    }))

    const mock = jest.fn().mockImplementation(() => {
        return {get: getMock}
    })

    return new mock()
}
