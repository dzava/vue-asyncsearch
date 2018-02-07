# vue-asyncsearch

This repository contains a collection of vue components that aim to help build asynchronous search pages.
It is inspired by the [vue-instantsearch](https://github.com/algolia/vue-instantsearch) project.

# Demo

You can view a demo [here](https://dzava.github.io/vue-asyncsearch/)

## Installation

You can install the package via yarn:

```bash
yarn add vue-asyncsearch --dev
```

or npm:

```bash
npm install asyncsearch --save-dev
```

Next you must register the components you want to use.
```js
import Vue from 'vue';
import {Search, Input, Results} from 'vue-asyncsearch'

Vue.component('as-input', Input)
Vue.component('as-results', Results)
Vue.component('as-search', Search)
```

or you can register all the components
```js
import AsyncSearch from 'vue-asyncsearch';

Vue.use(AsyncSearch);
```

## Usage
```html
<as-search url="https://example.com/users">

	 <as-input name="username"
     		   placeholder="Search for users by their username"
               :reset-filters="['page']"></as-input>

     <as-filter-by-selector name="per_page"
                            :default-value="5"
                            :options="[
                               {label: '3 users per page', value: 3},
                               {label: '5 users per page', value: 5},
                               {label: '10 users per page', value: 10},
                               {label: '12 users per page', value: 12},
                            ]"></as-filter-by-selector>

    <as-results>
        <div slot-scope="{ result: user }"> {{ user.username }} </div>
    </as-results>
</as-search>
```

This will perform a *GET* request to the `https://example.com/users?per_page=5` endpoint and will display the
username field of of the result.
It will also display an input box that can be used to set the `username` query parameter
and a select box that can set the `per_page` parameter. Searching for a username or selecting a different option
from the select box will trigger a new request to fetch new data.

The response must be a json response and contain a `data` key with the array of the results as it's value, and optional
pagination information.


### Props
`as-search`:
* `url`: (required) The endpoint that will be used to fetch the data
* `store-config`: a [Configuraton](#configuration) object

`as-input`:
* `name`: (required) the query parameter this filter is corresponds to. Giving this prop a value of `first_name`
then a query parameter with the value of the input will be appended to the query
* `default-value`: The default value of the filter, this value is used when resetting the filters using the `as-clear` component
* `reset-filters`: An array of filter names to reset when this filter's value changes

`as-filter-by-selector`:
* `name`: (required) same as `as-input`
then a query parameter with the value of the input will be appended to the query
* `options`: an array of objects in the following format `{label: '', value: ''}`
* `default-value`: The default value of the filter, this value is used when resetting the filters using the `as-clear` component. The value here should match the value key of one of the options
* `reset-filters`: An array of filter names to reset when this filter's value changes


`as-refinement-list`:
* `name`: (required) same as `as-input`, but the query parameter will be an array
* `options`: an array of objects in the following format `{label: '', value: ''}`
* `default-value`: The default value of the filter, this value is used when resetting the filters using the `as-clear` component. The value must be an array with each element being the value of one of the options that should be enabled
* `reset-filters`: An array of filter names to reset when this filter's value changes

`as-clear`:
* `filters`: an array of filter names to reset when the button is clicked. If no value is provided then all filters will be reset


### Configuration

*http*

If you don't specify an http library then `window.axios` will be used.
You can provide your own library using the, `http` key object passed to the `store-config` prop of the `as-search` component.
The library must provide a `get` method which will receive the `url`, and an object, with the following structure:
```js
{
    params: {
    	filter1; value,
        filter2; value,
    }
}
```
It must return a promise which when resolved will provide an object with a `data` key that contains the response data.
```js
{
    data: {
        data: [...],
        current_page: 2,
        total_pages: 4,
    }
}
```

*pagination*

In order for the pagination component to work correctly it needs to know the current and last page of the paginated results.
By default the `last_page` and `current_page` fields of the response are used. You can use the `pagination` property of the
configuration object to provide a mapping for your specific case. For example given the following response
```js
{ data: [...], pagination: { current: 2, total: 5 } }
```
you would use the following configuration object
```js
{
	pagination: {
        last_page: 'pagination.total',
        current_page: 'pagination.total'
    }
}
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
