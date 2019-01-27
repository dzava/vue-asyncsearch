import demoData from './demo-data'

export default class Http {
    get(url, {params}) {
        return new Promise((resolve, reject) => {
            let results = this.applyFilters(params)

            const perPage = parseInt(params.per_page)
            const currentPage = parseInt(params.page)
            const totalPages = Math.ceil(results.length / perPage)

            const start = perPage * (currentPage - 1)
            results = results.slice(start, start + perPage)

            setTimeout(() => {
                console.log('resolved', params, {start, end: start + perPage},)
                resolve({
                    data: {
                        data: results,
                        pagination: {
                            last_page: totalPages,
                            current_page: currentPage,
                            per_page: perPage,
                        },
                    },
                })
            }, 500)
        })
    }

    applyFilters(filters) {
        let results = demoData

        if (filters.first_name) {
            results = results.filter(
                ({first_name}) => first_name.toLowerCase().indexOf(filters.first_name.toLowerCase()) > -1,
            )
        }

        if (filters.last_name) {
            results = results.filter(
                ({last_name}) => last_name.toLowerCase().indexOf(filters.last_name.toLowerCase()) > -1,
            )
        }

        if (filters.status) {
            results = results.filter(({banned}) => banned)
        }

        if (filters.role && filters.role.length) {
            results = results.filter(({role}) => filters.role.indexOf(role) > -1)
        }

        return results
    }
}
