class ViewTransition extends React.Component {
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
          duration: this.props.duration
        }
      ).start()
    });
  }

  render() {
    return (
      <Animated.View style={[this.props.style, this.state.transitions]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
