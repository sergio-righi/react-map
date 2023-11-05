## Get Started

Step 1 : Create the `.env` file.<br/>

```plaintext
REACT_APP_MAPBOX_API_KEY=Mapbox API key
```

Step 2 : Run `npm i` to install the packages.<br/>
Step 3 : Run `npm run start` to start the server.<br/>
Step 4 : A browser instance will be created with the server page.<br/>
Step 5 : Access any of the following routes.<br/>

- `auth` => /auth
- `map` => /map?apiKey={API_KEY}

Step 6 : Enjoy! ✌

## Skeleton

### assets

- `data` the dummy data used to the API fake calls.
- `icons` the icons used on the app.
- `images` the images used on the app.
- `locales` the supported languages and its strings.
- `scss` the core style of the components, layouts, and pages.

### components

- `button` any custom button needed.
- `common` any common component such as Image, Iframe, etc.
- `controller` any parent component that controls their siblings state.
- `custom` any component from the `@mui/material` library that was customized.
- `datagrid` any component that displays data in table format.
- `datetime` any component that deals with date or time such as a Calendar or DatePicker.
- `dialog` any component that pops up and requires the user to answer either `yes` or `no`.
- `embedded` any component related to the `lead-gen` app.
- `error` any http error custom components.
- `form` any form control of the app.
- `google` any google component such as the Map.
- `icon` any group icon component such as the Lead Status.
- `input` any component that handles input from the user.
- `item` any item that will be used on a loop to create a list.
- `map` ny component related to the `map` app.
- `modal` any dialog popup that will be displayed over the page and it contains a form.
- `popup` any component that is used to display information and it is custom positioned on the screen.
- `progress` any component related to providing processing feedback to the user.
- `sidebar` any component realted to the sidebar of the `map` app.
- `tab` any component that will be rendered as a tab.
- `vendor` any mapbox component _(shall be renamed to mapbox in the future)_

### contexts

- `app` the user session, the locale strings, the current locale, and the feedback messages that will be displayed.
- `map` the controller for the `map` app. It stores the information for the markers and statuses.
- `service` the service layer that contains the calls to the APIs.
- `step` the controller for the `lead-gen` app. It controls the flow, the data, and the feedback.
- `theme` the controller for the current theme that the app is reffering the styles to.

### data

> it is the data layer which is responsible for handling the API calls and **it must be accessed by using the service layer context**.

- `auth` the authentication component.
- `embedded` the `lead-gen` app.
- `google` the `Google Calendar API` methods.
- `lead` the `map` app _(shall be renamed to map in the future)_.

### helpers

> it contains the methods that solve repeated actions and are likely to be reused.

- `auxiliars` functions that are designed to perform specific tasks or calculations that support the main functionality.
- `checks` functions used to check whether some condition is true. It includes the type testing methods.
- `combines` functions that perform either interpolations or marges of strings.
- `conversion` functions that are used to convert an input to a specific type.
- `expressions` it contains the regular expressions that are being used across the app.
- `sanitizes` functions that are used to force the format of the data.
- `validations` functions to validate data such as email, phone, or password policies.

### hooks

- `form` it facilitates the form handling, it handles the input data gathering and form validations.

### interfaces

> it contains the types for the data that comes from the APIs.

- `activityStatus` it maps the object that handles the status of the markers
- `embedded` it maps the object that handles the user data used to customize the `lead-gen` app.
- `marker` it maps the object that handles the markers for the `map` app.
- `savedList` it maps the object that handles the saved lists for the `map` app.
- `user` it maps the object that handles the session for the `map` app.

### layouts

> it contains the outer design that is commom to a group of pages.

- `auth` the authentication component.
- `default` the `map` app.
- `embedded` the `lead-gen` app.
- `empty` an empty layout for specific usages.
- `portal` the `admin-portal` app.

### middlewares

> it contains the middlewares to control behaviors such as access management.

- `protected` it handles the authorization of access to the pages.
- `checkApiKey` it checks if the API key is in the URL, if not, redirect to 404 page.

### pages

> it contains the pages where the routes are pointed at.

- `auth` the authentication component.
- `common` the `map` app _(shall be renamed to map in the future and the common stays to handle shared pages)_.
- `embedded` the `lead-gen` app.
- `portal` the `admin-portal` app.

### router

> it contains all the routes and it controls the access management of the app.

### services

> it is the service layer which is responsible for treating the data that was returned from the data layer.

- `auth` the authentication component.
- `embedded` the `lead-gen` app.
- `google` any service provided by google such as `Google Calendar API`.
- `lead` the `map` app _(shall be renamed to map in the future)_.

### themes

> it contains all the values related to the style of the app.

- `base` it contains the default values for `border`, `color`, `font`, and `spacing`.
  - `border` the default border radius.
  - `color` colors that does not change according to the theme such as `primary`, `accent`, `status`, `black`, and `white`.
  - `component` the default property values for the components such as `height`, `width`, and `letter-spacing`.
  - `font` the default font sizes and weights for the app.
  - `spacing` the default spacing for the app.
- `interfaces` it contains the interfaces used on themes.
- `LightTheme` it is the file that represents a theme style `Light`.
  - `theme` the default theme color.
  - `border` the default border color.
  - `shadow` the default shadow.
  - `input` the default form field color.
  - `font` the default font color.
  - `background` the default background color.

### types

> it contains all the internal types of the app.

- `coordinate` the type used to handle coordinates `latitude` and `longitude` for the map.
- `embedded` it maps the object that handles the information gathered from the `lead-gen` app.
- `event` the type used to handle the `Google Calendar` type.
- `feedback` the type used to handle the feedback messages to the user.
- `field` the type used to handle the form validation.
- `pairvalue` the type used to handle the need of a `pair-value` object.
- `production` the type used to handle the data coming from the iframe.
- `response` the type used to handle the data coming from the APIs.

### utils

> it contains useful resources that aims to help the maintainance of the app by centralizing code that can be reused.

- `apis` the axios instance of all the APIs.
- `constants` all the hardcoded values used on the app.
- `enum` properties or values that can only be a certain number of possible.
- `geocoder` the mapbox GeocoderAPI methods.
- `leadgen` the Aerialytic iframe methods.
- `schedule` it stores the exceptions for the calendar (it can be used to add the holidays to the map).
- `store` it manages the `sessionStorage` of the browser.
- `themes` it contains the `@mui/material` theme customization object.
