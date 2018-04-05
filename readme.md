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
               :reset-params="['page']"></as-input>

     <as-select name="per_page"
                :default-value="5"
                :options="[
                   {label: '3 users per page', value: 3},
                   {label: '5 users per page', value: 5},
                   {label: '10 users per page', value: 10},
                   {label: '12 users per page', value: 12},
                ]"></as-select>

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


### Components
#### `as-search`:
A wrapper component that allows you to configure the search endpoint and provides the search state to it's children.
All other components must be children of this component.
##### Props
* `url`: (required) The endpoint that will be used to fetch the data
* `http`: the library which will be used to perform the requests. see [Configuraton](#configuration) for more information
* `pagination`: an object that describes how to extract pagination information from the response. see [Configuraton](#configuration) for more information
* `refresh-on-param-change`: a boolean indicating whether the results should be refreshed after a parameter value changes. default: `true`
* `use-history`: a boolean indicating whether the query params should be added to the browser url. The url will also be used to set the values of the params
* `results-path`: the key that is used to retrieve the results from the response data.
    Use an empty string if the results are the only data in the response. Supports dot notation. (default: data)
* `search-on-load`: a boolean indicating if results should be automatically fetched when the component loads. (default: true)

#### `as-results`:
Renders when there are results and provides access to the results

#### `as-input`:
A simple text input that will update the parameter value as its value changes.
##### Props
* `name`: (required) the query parameter name this input value will be assigned to.
* `default-value`: The default value of the parameter, this value is used when resetting the parameters using the `as-clear` component
* `reset-params`: An array of param names to reset when this param's value changes
* `refresh-on-change`: a boolean indicating whether the results should be refreshed when the value changes. Default's to the value of the `refresh-on-param-change` prop of the `as-search` component.
* `delay`: the delay (in milliseconds), since the last time the value changed, after which the results will be refreshed
* 'add-to-url': boolean indicating if the param should be appended to the url when use history is true (default: true)

#### `as-select`:
A component that allows setting a param from a list of values
##### Props
* `name`: (required) same as `as-input`
* `options`: an array of objects in the following format `{label: '', value: ''}`
* `default-value`: The default value of the param, this value is used when resetting the parameters using the `as-clear` component. The value here should match the value key of one of the options
* `reset-params`: An array of param names to reset when this param's value changes
* `refresh-on-param-change`: same as `as-input`
* 'add-to-url': boolean indicating if the param should be appended to the url when use history is true (default: true)


#### `as-checkbox`:

##### Props
* `name`: (required) same as `as-input`, but the query parameter will be an array
* `options`: an array of objects in the following format `{label: '', value: ''}`
* `default-value`: The default value of the param, this value is used when resetting the parameters using the `as-clear` component. The value must be an array with each element
being the value of one of the options that should be enabled by default
* `reset-params`: An array of param names to reset when this param's value changes
* `refresh-on-param-change`: same as `as-input`
* 'add-to-url': boolean indicating if the param should be appended to the url when use history is true (default: true)

#### `as-radio`:

##### Props
* `name`: (required) same as `as-input`
* `options`: an array of objects in the following format `{label: '', value: ''}`
* `default-value`: The default value of the param, this value is used when resetting the parameters using the `as-clear` component. The value here should match the value key of one of the options
* `reset-params`: An array of param names to reset when this param's value changes
* `refresh-on-param-change`: same as `as-input`
* 'add-to-url': boolean indicating if the param should be appended to the url when use history is true (default: true)

#### `as-clear`:
A button used to reset parameters to their default value
##### Props
* `params`: an array of parameter names to reset when the button is clicked. If no value is provided then all parameters will be reset

#### `as-loading`:
A component that is rendered while fetching results
##### Props
* `message`: the message to display. defailt: `'Loading...'`

#### `as-load-more`:
A button that, will increase the param value by one, perform a new request and append the response data to the results.
##### Props
* `name`: (required) same as `as-input`. default: `page`
* `default-value`: same as `as-input`. default: `1`
* `resetParams`: same as `as-input`
* 'add-to-url': boolean indicating if the param should be appended to the url when use history is true (default: false)

#### `as-pagination`:
A list of links to navigate paginated results
##### Props
Same as `as-load-more`.

#### `as-no-results`:
A component that renders when there are no results in the response

#### `as-search-button`:
A button that refreshes the results

#### `as-param`:
A wrapper component which gives access to a param.
##### Props
* `name`: (required) same as `as-input`
* `default-value`: same as `as-input`
* `resetParams`: same as `as-input`
* `refresh-on-change`: same as `as-input`
##### Usage
```html
<as-param name="count" :default-value="1">
    <template slot-scope="{value, setValue}">
        <button @click="setValue(value+1)">+</button>
            {{ value }}
        <button @click="setValue(value-1)">-</button>
    </template>
</as-param>
```

### Configuration

*http*

If you don't specify an http library then `vm.$http` or `window.axios` will be used.
You can provide your own library using the, `http` prop of the `as-search` component.
The library must provide a `get` method which will receive the `url`, and an object, with the following structure:
```js
{
    params: {
    	param1; value,
        param2; value,
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
By default the `last_page` and `current_page` fields of the response are used. You can use the `pagination` prop of the
`as-search` component to provide a mapping for your specific case. For example given the following response
```js
{ data: [...], pagination: { current: 2, total: 5 } }
```
you would use the following configuration object
```js
{
    last_page: 'pagination.total',
    current_page: 'pagination.total'
}
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
