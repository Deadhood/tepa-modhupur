import {extendObservable} from 'mobx'

export default class UIStore {
  constructor () {
    extendObservable(this, {
      horizon: null
    })
  }
}
