import React from 'react'
import {Animated, Easing} from 'react-native';


const Transitions = {
  View: withStyleTransitions(Animated.View),
  Text: withStyleTransitions(Animated.Text)
}

function deepValuesChanged (a, b) {
  let aType = typeof a;
  let bType = typeof b;

  if (aType !== bType) {
    return true
  }
  // @TODO
  return a !== b;
}

function diff (nextSet, prevSet) {
  let nextKeys = Object.keys(nextSet);
  let prevKeys = Object.keys(prevSet);

  let additions = nextKeys.filter(key => !(key in prevSet));
  let removals = prevKeys.filter(key => !(key in nextSet));
  let changes = nextKeys.filter(key => {
    return (key in prevSet) && deepValuesChanged(nextSet[key], prevSet[key])
  })

  return {additions, removals, changes}
}

function without (obj, keys) {
  return Object.keys(obj).reduce((out, key) => {
    if (keys.indexOf(key) > -1) {
      out[key] = obj[key];
    }
    return out;
  }, {});
}

function withStyleTransitions (WrappedComponent) {
  class Transition extends React.Component {
    static defaultProps = {
      easing: Easing.Linear
    }

    state = {}

    constructor(props) {
      super(props)

      this.state.transitions = Object.keys(this.props.style).reduce((transitions, key) => {
        transitions[key] = new Animated.Value(this.props.style[key])
        return transitions
      }, {});
    }

    componentWillReceiveProps(nextProps) {
      console.log('processing diff for', {
        nextStyle: nextProps.style,
        prevStyle: this.props.style
      })
      let {additions, changes, removals} = diff(nextProps.style, this.props.style)

      console.log('changes', {additions, changes, removals})

      console.log('state transitions', this.state.transitions)

      // remove no longer used styles
      // add new styles

      // perform style changes
      changes.forEach(key => {
        Animated.timing(
          this.state.transitions[key],
          {
            toValue: nextProps.style[key],
            duration: this.props.duration,
            easing: this.props.easing
          }
        ).start()
      });

      if (additions.length > 0 || removals.length > 0) {
        let nextState = Object.keys(nextProps.style).reduce((obj, key) => {
          if (this.state.transitions[key]) {
            obj[key] = this.state.transitions[key]
          } else {
            obj[key] = new Animated.Value(nextProps.style[key])
          }
          return obj
        }, {});
        this.setState({
          transitions: nextState
        })
      }

    }

    render() {
      return (
        <WrappedComponent style={[this.props.style, this.state.transitions]}>
          {this.props.children}
        </WrappedComponent>
      )
    }
  }

  return Transition
}

export default Transitions;
export {withStyleTransitions};
