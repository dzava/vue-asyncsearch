import Clear from './components/Clear'
import Select from './components/Select'
import Input from './components/Input'
import InfiniteScroll from './components/InfiniteScroll'
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
    install(Vue, prefix = 'as') {
        Vue.component(`${prefix}-clear`, Clear)
        Vue.component(`${prefix}-select`, Select)
        Vue.component(`${prefix}-input`, Input)
        Vue.component(`${prefix}-infinite-scroll`, InfiniteScroll)
        Vue.component(`${prefix}-loading`, Loading)
        Vue.component(`${prefix}-load-more`, LoadMore)
        Vue.component(`${prefix}-no-results`, NoResults)
        Vue.component(`${prefix}-param`, Param)
        Vue.component(`${prefix}-pagination`, Pagination)
        Vue.component(`${prefix}-checkbox`, Checkbox)
        Vue.component(`${prefix}-radio`, Radio)
        Vue.component(`${prefix}-results`, Results)
        Vue.component(`${prefix}-search`, Search)
        Vue.component(`${prefix}-search-button`, SearchButton)
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
