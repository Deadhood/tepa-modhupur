import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

import UIStore from './UIStore'
import App from './components/App'

ReactDOM.render(
  <Provider uistore={new UIStore()}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
