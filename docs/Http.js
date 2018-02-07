import demoData from './demo-data'

export default class Http {
    get(url, { params }) {
        return new Promise((resolve, reject) => {
            let results = this.applyFilters(params)

            const totalPages = Math.ceil(results.length / params.per_page)

            const start = params.per_page * (params.page - 1)
            results = results.slice(start, start + params.per_page)

            setTimeout(() => {
                resolve({
                    data: {
                        data: results,
                        pagination: {
                            last_page: totalPages,
                            current_page: params.page,
                            per_page: params.per_page,
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
                ({ first_name }) => first_name.toLowerCase().indexOf(filters.first_name.toLowerCase()) > -1,
            )
        }

        if (filters.last_name) {
            results = results.filter(
                ({ last_name }) => last_name.toLowerCase().indexOf(filters.last_name.toLowerCase()) > -1,
            )
        }

        if (filters.role.length) {
            results = results.filter(({ role }) => filters.role.indexOf(role) > -1)
        }

        return results
    }
}
