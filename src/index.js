import Clear from './components/Clear'
import FilterBySelector from './components/FilterBySelector'
import Input from './components/Input'
import Loading from './components/Loading'
import LoadMore from './components/LoadMore'
import NoResults from './components/NoResults'
import Pagination from './components/Pagination'
import RefinementList from './components/RefinementList'
import Results from './components/Results'
import Search from './components/Search'
import SearchButton from './components/SearchButton'
import SearchStore from './SearchStore'

const AsyncSearch = {
    Clear,
    FilterBySelector,
    Input,
    Loading,
    LoadMore,
    NoResults,
    Pagination,
    RefinementList,
    Results,
    Search,
    SearchButton,

    install(Vue) {
        Vue.component('as-clear', Clear)
        Vue.component('as-filter-by-selector', FilterBySelector)
        Vue.component('as-input', Input)
        Vue.component('as-loading', Loading)
        Vue.component('as-load-more', LoadMore)
        Vue.component('as-no-results', NoResults)
        Vue.component('as-pagination', Pagination)
        Vue.component('as-refinement-list', RefinementList)
        Vue.component('as-results', Results)
        Vue.component('as-search', Search)
        Vue.component('as-search-button', SearchButton)
    },
}

export default AsyncSearch

export {
    Clear,
    FilterBySelector,
    Input,
    Loading,
    LoadMore,
    NoResults,
    Pagination,
    RefinementList,
    Results,
    Search,
    SearchButton,
    SearchStore,
}
