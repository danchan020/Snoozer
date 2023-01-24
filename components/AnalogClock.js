import { View, Text } from "react-native";
import PropTypes from "prop-types";

import React, { Component } from "react";

export default class AnalogClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: props.hour,
      minutes: props.minutes,
      seconds: props.seconds,
      autostart: props.autostart,
      size: props.size,
      colorClock: props.colorClock,
      colorNumber: props.colorNumber,
      colorCenter: props.colorCenter,
      colorHour: props.colorHour,
      colorMinutes: props.colorMinutes,
      colorSeconds: props.colorSeconds,
      showSeconds: props.showSeconds,
      ping: false, //Used for rendering
    };
  }
  render() {
    let {
      size,
      colorClock,
      colorNumber,
      colorCenter,
      colorHour,
      colorMinutes,
      colorSeconds,
      hour,
      minutes,
      seconds,
      showSeconds,
    } = this.state;

    return (
      <View>
        <Text>AnalogClock</Text>
      </View>
    );
  }
}
