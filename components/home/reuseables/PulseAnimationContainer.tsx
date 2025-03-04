import { FC, useEffect } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
}

const PulseAnimationContainer: FC<Props> = (props) => {
  const opacitySharedValue = useSharedValue(1);
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: opacitySharedValue.value,
    };
  });
  useEffect(() => {
    opacitySharedValue.value = withRepeat(
      withTiming(0.3, { duration: 1000 }),
      -1,
      true
    );
  }, []);
  return <Animated.View style={opacity}>{props.children}</Animated.View>;
};

export default PulseAnimationContainer;
