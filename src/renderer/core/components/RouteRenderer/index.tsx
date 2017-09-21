import * as React from 'react'

import Button from 'renderer/common/components/Button'

import './styles.scss'

export default class RouteRenderer extends React.Component {
  render() {
    return (
      <div className="RouteRenderer">
        <Button icon="navFile" label="lmao"/>
      </div>
    )
  }
}
