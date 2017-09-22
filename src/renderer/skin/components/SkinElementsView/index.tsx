import createMemoryHistory from 'history/createMemoryHistory'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import { bind } from 'decko'

import { NavLink, Route, Router } from 'react-router-dom'
import ElementItem from 'renderer/skin/components/SkinElementsView/ElementItem'

import './styles.scss'

interface SkinElementsViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinElementsView extends React.Component<SkinElementsViewProps> {
  history = createMemoryHistory()

  componentWillMount() {
    this.history.push('/title')
  }

  @bind
  renderShitView() {
    const { elements } = this.props.skinStore!.skin

    return (
      <div className="xd">
        {elements.map(element => <ElementItem element={element}/>)}
      </div>
    )
  }

  render() {

    return (
      <Router history={this.history}>
        <div className="SkinElementsView">
          <div className="categories">
            <NavLink to="/title" className="TabButton" activeClassName="-isActive">
              Title
            </NavLink>
            <NavLink to="/songSelect" className="TabButton" activeClassName="-isActive">
              Song Select
            </NavLink>
            <NavLink to="/ranking" className="TabButton" activeClassName="-isActive">
              Ranking
            </NavLink>
          </div>
          <div className="categoryView">
            <Route exact path="/title" render={this.renderShitView}></Route>
            <Route exact path="/songSelect" render={() => <div>song select preview</div>}></Route>
            <Route exact path="/ranking" render={() => <div>ranking preview</div>}></Route>
          </div>
        </div>
      </Router>
    )
  }
}
