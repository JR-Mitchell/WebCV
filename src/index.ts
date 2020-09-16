//Basic imports
import React from 'react'
import ReactDOM from 'react-dom'

//Local .tsx imports
import { App, AppProps } from 'views/App/app'

//Setup imports
const appProps = require('setup/app.json') as AppProps;

ReactDOM.render(
    React.createElement(App, appProps, null),
    document.getElementById('root')
)
