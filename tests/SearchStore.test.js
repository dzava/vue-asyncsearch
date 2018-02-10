import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Store from '../src/SearchStore'

let store

describe('SearchStore', () => {
    beforeEach(() => {
        store = new Store('test.example.com/users')
        store.addQueryParam('name', 'John')
    })

    it('can accept a custom http instance in options', () => {
        const http = axios.create({baseURL: 'http://example.com'})

        store = new Store('/users', {http})

        expect(store._http.defaults.baseURL).toBe('http://example.com')

        window.axios = { defaults: {baseURL: 'not-a-real-axios'}  }
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

    it('can register a new param', () => {
        store.addQueryParam('role', 'developer')

        expect(store.getQueryParam('role')).toBe('developer')
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

    it('will update the results and pagination on search', async () => {
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet('/users', {name: 'John'}).reply(200, {
            data: [{name: 'John Doe'}, {name: 'John Roe'}],
            last_page: 5,
            current_page: 3
        })
        store = new Store('/users', {http: axios})

        store.start()
        await store.search()

        expect(store.results).toEqual([{name: 'John Doe'}, {name: 'John Roe'}])
        expect(store.pagination).toEqual({last_page: 5, current_page: 3})
    })

    it('will append the results on load more', async () => {
        const mockAdapter = new MockAdapter(axios)
        mockAdapter.onGet('/users', {name: 'John'}).reply(200, {
            data: [{name: 'John Doe'}, {name: 'John Roe'}],
            last_page: 5,
            current_page: 3
        })
        store = new Store('/users', {http: axios})
        store._results = [{name: 'Jane Doe'}]

        store.start()
        await store.loadMore()

        expect(store.results).toEqual([{name: 'Jane Doe'}, {name: 'John Doe'}, {name: 'John Roe'}])
        expect(store.pagination).toEqual({last_page: 5, current_page: 3})
    })
})
