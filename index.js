const Transition = {
  View: withStyleTransitions(Animated.View),
  Text: withStyleTransitions(Animated.Text)
}

function withStyleTransitions (WrappedComponent) {
  class Transition extends React.Component {
    static defaultProps = {
      easing: Easing.Linear
    }

    state = {
      transitions: {}
    }

    constructor(props) {
      super(props)

      this.state.transitions = Object.keys(this.props.style).reduce((transitions, key) => {
        transitions[key] = new Animated.Value(this.props.style[key])
        return transitions
      }, {});
    }

    componentWillReceiveProps(nextProps) {
      let styleDiffs = diff(nextProps.style, this.props.style)

      styleDiffs.forEach(key => {
        Animated.timing(
          this.state.transition[key]
          {
            toValue: nextProps.style[key],
            duration: this.props.duration,
            easing: this.props.easing
          }
        ).start()
      });
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
