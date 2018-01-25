import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Rater from '../src/'
import LimitedRater from './LimitedRater'
class Face extends Component {
  render() {
    let icons = {
      bad: '🙁',
      normal: '😐',
      good: '😍'
    }
    let { isActive, willBeActive, icon, onMouseEnter, onClick } = this.props
    let faceicon = isActive || willBeActive ? icons[icon] : '😶'
    return <span onMouseEnter={onMouseEnter} onClick={onClick}>{faceicon}</span>
  }
}

Face.propTypes = {
  isActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onClick: PropTypes.func
}
