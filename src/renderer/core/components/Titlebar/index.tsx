import * as React from 'react'
import { bind } from 'decko'
import { remote } from 'electron'

import Icon from '../../../common/components/Icon'

const window = remote.getCurrentWindow()

export default class Titlebar extends React.Component {
  public state = {
    'isMaximized': null
  }

  constructor() {
    super()

    this.state = {
      'isMaximized': window.isMaximized(),
    }

    window.on('resize', this.handleResize)
  }

  @bind
  handleResize() {
    this.setState({
      'isMaximized': window.isMaximized()
    })
  }

  @bind
  minimizeWindow() {
    window.minimize()
  }

  @bind
  toggleMaximized() {
    const { isMaximized } = this.state

    if (isMaximized) window.unmaximize()
    if (!isMaximized) window.maximize()
  }

  @bind
  closeWindow() {
    window.close()
  }

  render() {
    const { isMaximized } = this.state

    return (
      <header className="Titlebar">
        <div className="title">{ document.title }</div>
        <div className="buttons">
          <a className="button" role="button" onClick={this.minimizeWindow}>
            <Icon name="windowMinimize"/>
          </a>
          <a className="button" role="button" onClick={this.toggleMaximized}>
            <Icon name={ isMaximized ? 'windowUnmaximize' : 'windowMaximize' }/>
          </a>
          <a className="button" role="button" onClick={this.closeWindow}>
            <Icon name="windowClose"/>
          </a>
        </div>
      </header>
    )
  }
}
