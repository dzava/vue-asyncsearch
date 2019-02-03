# Changelog

## 2.0.0
- Support for object responses
- The `Search` component no longer requires an explicit wrapper node for its children
- Configurable prefix
- Added `InfiniteScroll` component
- Added debounce support to the `Param` component
- Fixed errors when `Param` used as a way to register params
- Added `tag` prop to the `Results` component
- Simplified the `Checkbox` and `Radio` components. Removed all the extra markup and will now simply render an input field
- Removed the `options` prop from the `Select` component. Can now be used the same ways as the native select.
- Removed the `results-path` prop from the `Search` component. Use the `path` prop of the `Results` and `NoResults` components.
- Query params that are not managed by the Store will no longer be deleted when updating the url
- Removed `message` prop from the `Loading` component
- Added `tag` and `delay` props to the `Loading` component
- Removed `label` prop from SearchButton

## 1.1.0
- The fields used for the label and value of Checkbox/Radio/Select components
can be configured using the `label-field` and `value-field` props.
- Pressing enter on the input, when `refreshOnChange` is false, will trigger a search.
- The text for the buttons can now be set using the label prop.

## 0.1.0
- Initial release
