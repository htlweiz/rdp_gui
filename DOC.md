# Gui Documentation
## basic functionality

The Gui displays data, which it gets from the api using requests. Also it allows you to search for specific entries

## Components

### DateFilter.vue
This component provides the functionality to filter the displayed data based on a specified date range. It emits an ‘updateFilter’ event with the start and end dates when the user changes the input in the filter fields. The dates are formatted as strings.

### ValueFilter

This component provides the functionality to filter the displayed data based on a specified value range. It emits an ‘updateFilter’ event with the lower and upper value limits when the user changes the input in the filter fields.

### FilterDropdown

This component acts as a container for the DateFilter and ValueFilter components. It allows the user to toggle the visibility of these filters. When a filter is updated, it emits an ‘updateFilter’ event with the new filter data.

### InputBar

This component provides a search bar functionality. It emits a ‘search’ event with the search string as an array when the user types in the search bar. The search string is split into an array of words, which can be used to filter the displayed data.

### SingleTypeDisplay

This component provides the functionality to edit a type’s name and unit. It emits an ‘update_type’ event when the user submits the changes. The updated type data is sent to the API using axios.

### TypesDisplay

This component acts as a container for the SingleTypeDisplay components. It allows the user to toggle the visibility of the TypeEditor. When a type is updated, it emits an ‘update_type’ event.

### ValuesDisplay

This component displays all of the type and value data in a list. It receives the values and value_types as props.

### App.vue

This is the main component of the application. It contains methods for fetching the types and values from the API, updating the filters, and handling the search functionality. It also contains the data properties for storing the fetched data and the current filter settings.
