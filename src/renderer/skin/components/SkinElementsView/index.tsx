import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import { observable } from 'mobx'
import Button from 'renderer/common/components/Button'
import './styles.scss'

interface SkinElementsViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinElementsView extends React.Component<SkinElementsViewProps> {
  categories = [
    { label: 'Title' },
    { label: 'Song Select' },
    { label: 'Results' },
    { label: 'osu!' },
    { label: 'osu!mania' },
    { label: 'osu!taiko' },
    { label: 'osu!catch' },
  ]

  @observable activeCategory = 0

  render() {
    return (
      <div className="SkinElementsView">
        <div className="categories">
          {this.categories.map((cat, index) => (
            <Button
              type="TabButton"
              label={cat.label}
              key={index}
              isActive={index === this.activeCategory}
              onClick={() => (this.activeCategory = index)}
            />
          ))}
        </div>
        <div className="categoryView" />
      </div>
    )
  }
}
