import _ from 'lodash'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { mount } from 'enzyme'

import App from 'components/App'
import configureStore from 'store/configureStore'
import Polyhedron from 'math/Polyhedron'

export default class AppPage {
  constructor(path = '/') {
    this.wrapper = mount(
      <Provider store={configureStore()}>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )
  }

  clickButtonWithText(text) {
    // click on the "augment" button
    this.wrapper
      .findWhere(n => n.type() === 'button' && n.text() === text)
      .simulate('click')
    return this
  }

  simulateLoad() {
    const shape = this.wrapper.find('Faces').find('shape')
    shape.find('EventListener').prop('onLoad')()
    return this
  }

  getPolyhedron() {
    return this.wrapper.find('Faces').prop('solidData')
  }

  clickFaceIndex(faceIndex) {
    const polyhedron = this.getPolyhedron()
    const hitPnt = polyhedron.faceCentroid(faceIndex)
    const shape = this.wrapper.find('Faces').find('shape')
    shape.simulate('mousemove', { hitPnt })
    shape.simulate('mousedown')
    shape.simulate('mouseup')
    return this
  }

  clickFaceWithNumSides(n) {
    const polyhedron = this.getPolyhedron()
    const fIndex = _.findIndex(polyhedron.faces, face => face.length === n)
    return this.clickFaceIndex(fIndex)
  }

  expectTransitionTo(expected) {
    const viewer = this.wrapper.find('Viewer')
    const history = viewer.prop('history')
    expect(history.location.pathname).toEqual(`/${expected}/related`)
    expect(
      this.wrapper
        .find('Faces')
        .prop('solidData')
        .isIsomorphicTo(Polyhedron.get(expected)),
    ).toBe(true)
    return this
  }
}