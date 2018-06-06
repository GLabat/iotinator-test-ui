import React from 'react'
import { render } from 'react-dom'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

import 'bulma/css/bulma.css'

const model = observable.array([
  {
    name: 'Switch 1',
    on: true
  },
  {
    name: 'Switch 2',
    on: false
  }
])

const toggle = action(idx => {
  model[idx].on = !model[idx].on
})

const enabled = computed(() => model.filter(s => s.on).length)

const App = observer(() => {
  return (
    <div style={{ margin: '2em' }}>
      <h3 className="title is-3">
        Number of enabled switches: {enabled.get()}
      </h3>
      <ul>
        {model.map((s, idx) => {
          return (
            <li key={idx} className="card" style={{ margin: '1em' }}>
              <div className="card-header">
                <h2 className="card-header-title">
                  {s.name} {s.on ? 'ON' : 'OFF'}
                </h2>
              </div>
              <div class="card-content">
                <button className="button" onClick={() => toggle(idx)}>
                  {'Turn ' + (s.on ? 'Off' : 'On')}
                </button>
              </div>
              <div className="card-footer" />
            </li>
          )
        })}
      </ul>
    </div>
  )
})

render(<App />, document.getElementById('root'))
