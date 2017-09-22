import * as React from 'react'

import getClassName from 'classnames'

import Icon from 'renderer/common/components/Icon'
import { IconType } from 'renderer/common/icons/types'

import './default.scss'
import './tab.scss'

interface ButtonProps {
  type?: string
  icon?: IconType
  label?: string
  isActive?: boolean
  onClick?: () => any
}

export default class Button extends React.Component<ButtonProps> {
  renderLabel() {
    const { label } = this.props

    if (label) return <div className="label">{label}</div>
  }

  renderIcon() {
    const { icon } = this.props

    if (icon)
      return (
        <div className="icon">
          <Icon name={icon} />
        </div>
      )
  }

  render() {
    const { type = 'Button', isActive, onClick } = this.props

    const classNames = getClassName(type, {
      '-isActive': isActive,
    })

    return (
      <a role="button" className={classNames} onClick={onClick}>
        {this.renderIcon()}
        {this.renderLabel()}
      </a>
    )
  }
}
