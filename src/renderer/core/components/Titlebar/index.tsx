import { bind } from 'decko'
import { remote } from 'electron'
import * as React from 'react'
import Button from 'renderer/common/components/Button';
import Icon from 'renderer/common/components/Icon'
import './styles.scss'

const window = remote.getCurrentWindow()

interface TitlebarState {
  isMaximized: boolean
}

export default class Titlebar extends React.Component<{}, TitlebarState> {
  state = {
    'isMaximized': window.isMaximized(),
  }

  componentDidMount() {
    window.on('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeListener('resize', this.handleResize)
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
