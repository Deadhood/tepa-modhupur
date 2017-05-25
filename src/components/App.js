import React from 'react'
import Horizon from '@horizon/client'

import {observer, inject} from 'mobx-react'

class App extends React.Component {
  render () {
    return <div>Hello World</div>
  }

  componentDidMount () {
    this.props.uistore.Horizon = Horizon({authentication: 'token'})
    window.hz = this.props.uistore.Horizon
    this.props.uistore.Horizon('users').watch().subscribe(e => {
      console.log(e)
    })
  }
}

export default inject(['uistore'])(observer(App))
