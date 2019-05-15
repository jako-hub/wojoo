import React from "react";
import PropTypes from 'prop-types';
import { 
	Animated, 
	Easing, 
	StyleSheet,
	Dimensions,	
} from "react-native";

const height = Dimensions.get('window').height;

class SlideUp extends React.Component {
	animControl = 0;
	positionControl = 0;
	constructor(props) {
		super(props);
		this.animControl = new Animated.Value(0);
		this.positionControl = new Animated.Value(-height);
	}

	componentDidMount() {
		this.animateComponent();
	}

	animateComponent() {
		Animated.timing(this.positionControl, {
			toValue: 0,
			duration: 1000,
			easing: Easing.linear,
		}).start();
	}

	render() {
		const { visible, style, children, ...rest } = this.props;
		/*
		const containerStyle = {
		opacity: this.animControl.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 0.5, 1]
		}),
		};
		*/
		const containerStyle = {
			transform : [
				{translateY : this.positionControl.interpolate({
					inputRange: [0, 0.5, 1],
					outputRange: [0, 10, 0],
				})}
			],
		};

		const combinedStyle = [containerStyle];
		return (
		<Animated.View style={[style, styles.root, containerStyle]} {...rest}>
			{children}
		</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
  root: {
    opacity: 1
  }
});

SlideUp.propTypes = {
	size : PropTypes.number,
};

export default SlideUp;
