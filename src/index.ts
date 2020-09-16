//Basic imports
import React from 'react'
import ReactDOM from 'react-dom'

//Local .tsx imports
import App from 'views/App/app'

ReactDOM.render(
    React.createElement(App, {drawerWidth:256,cvTitle:"TODO: Make title load in from setup/app.json"}, null),
    document.getElementById('root')
)
