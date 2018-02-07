import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Store from '../src/SearchStore'

let store

describe('SearchStore', () => {
    beforeEach(() => {
        store = new Store('test.example.com/users')
        store.registerFilter('name', 'John')
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

    it('can register a new filter', () => {
        store.registerFilter('role', 'developer')

        expect(store.getFilter('role')).toBe('developer')
    })

    it('can set a filters value', () => {
        expect(store.getFilter('name')).toBe('John')

        store.setFilter('name', 'John Doe')

        expect(store.getFilter('name')).toBe('John Doe')
    })

    it('can reset a filter to the default value', () => {
        store.setFilter('name', 'John Doe')
        expect(store.getFilter('name')).toBe('John Doe')

        store.resetFilter('name')
        expect(store.getFilter('name')).toBe('John')
    })

    it('can reset all filters', () => {
        store.registerFilter('role', 'user')
        store.setFilter('role', 'developer')
        store.setFilter('name', 'John Doe')

        store.clear()

        expect(store.getFilter('name')).toBe('John')
        expect(store.getFilter('role')).toBe('user')
    })

    it('throws when setting an unknown filter', () => {
        expect(() => {
            store.setFilter('unknown', 'value')
        }).toThrow()
    })

    it('throws when retrieving an unknown filter', () => {
        expect(() => {
            store.getFilter('unknown')
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
})
