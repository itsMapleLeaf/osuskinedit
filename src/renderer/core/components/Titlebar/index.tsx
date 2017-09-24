import { bind } from 'decko'
import { remote } from 'electron'
import { inject } from 'mobx-react'
import * as React from 'react'
import Button from 'renderer/common/components/Button'
import Icon from 'renderer/common/components/Icon'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import './styles.scss'

const win = remote.getCurrentWindow()

interface TitlebarProps {
  skinStore?: SkinStore
}

interface TitlebarState {
  isMaximized: boolean
}

@inject('skinStore')
export default class Titlebar extends React.Component<TitlebarProps, TitlebarState> {
  state = {
    isMaximized: win.isMaximized(),
  }

  componentDidMount() {
    win.on('resize', this.handleResize)
  }

  componentWillUnmount() {
    win.removeListener('resize', this.handleResize)
  }

  @bind
  handleResize() {
    this.setState({
      isMaximized: win.isMaximized(),
    })
  }

  @bind
  minimizeWindow() {
    win.minimize()
  }

  @bind
  toggleMaximized() {
    const { isMaximized } = this.state

    if (isMaximized) win.unmaximize()
    if (!isMaximized) win.maximize()
  }

  @bind
  closeWindow() {
    win.close()
  }

  render() {
    const { isMaximized } = this.state

    return (
      <header className="Titlebar">
        <div className="title">{document.title}</div>
        <div className="divider" />
        <div className="actions">
          <div className="action">
            <Button type="FlatButton" label="Load Skin" onClick={this.props.skinStore!.loadSkin} />
          </div>
        </div>
        <div className="buttons">
          <a className="button" role="button" onClick={this.minimizeWindow}>
            <Icon name="windowMinimize" />
          </a>
          <a className="button" role="button" onClick={this.toggleMaximized}>
            <Icon name={isMaximized ? 'windowUnmaximize' : 'windowMaximize'} />
          </a>
          <a className="button" role="button" onClick={this.closeWindow}>
            <Icon name="windowClose" />
          </a>
        </div>
      </header>
    )
  }
}
