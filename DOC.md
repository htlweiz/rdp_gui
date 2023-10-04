# Gui Documentation
## basic functionality

The Gui displays data, which it gets from the api using requests. Also it allows you to search for specific entries

## Components

### InputBar
Provides a search bar functionality. It emits a ‘search’ event with the words in the search string as an array when the user types in the search bar.

### SingleTypeDisplay
Provides update functionality. It allow updating a type’s name and unit. It uses axios to send data to the api

### TypesDisplay
It toggles the visibility of the TypeEditor. It includes a method toggleEditor that switches the editor_hidden data property between true and false, which results in showing or hiding the TypeEditor.

### ValuesDisplay
Displays all of the type and value data in a list. 