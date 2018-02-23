import Clear from './components/Clear'
import Select from './components/Select'
import Input from './components/Input'
import Loading from './components/Loading'
import LoadMore from './components/LoadMore'
import NoResults from './components/NoResults'
import Param from './components/Param'
import Pagination from './components/Pagination'
import Checkbox from './components/Checkbox'
import Radio from './components/Radio'
import Results from './components/Results'
import Search from './components/Search'
import SearchButton from './components/SearchButton'
import SearchStore from './SearchStore'

const AsyncSearch = {
    Clear,
    Select,
    Input,
    Loading,
    LoadMore,
    NoResults,
    Param,
    Pagination,
    Checkbox,
    Radio,
    Results,
    Search,
    SearchButton,

    install(Vue) {
        Vue.component('as-clear', Clear)
        Vue.component('as-select', Select)
        Vue.component('as-input', Input)
        Vue.component('as-loading', Loading)
        Vue.component('as-load-more', LoadMore)
        Vue.component('as-no-results', NoResults)
        Vue.component('as-param', Param)
        Vue.component('as-pagination', Pagination)
        Vue.component('as-checkbox', Checkbox)
        Vue.component('as-radio', Radio)
        Vue.component('as-results', Results)
        Vue.component('as-search', Search)
        Vue.component('as-search-button', SearchButton)
    },
}

export default AsyncSearch

export {
    Clear,
    Select,
    Input,
    Loading,
    LoadMore,
    NoResults,
    Param,
    Pagination,
    Checkbox,
    Radio,
    Results,
    Search,
    SearchButton,
    SearchStore,
}
