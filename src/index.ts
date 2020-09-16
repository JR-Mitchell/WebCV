//Basic imports
import React from 'react'
import ReactDOM from 'react-dom'

//Local .tsx imports
import { App } from './views/App/app.tsx'

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById('root')
)
