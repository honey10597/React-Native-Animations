import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const SIZE = 100;

// Define the type for the shared value as Animated.SharedValue<number>
const _handleRotation = (progress: Animated.SharedValue<number>): string => {
    'worklet';
    return `${(progress.value * 2 * Math.PI)}rad`;
};

const RotatingScalingSpringAnimation: React.FC = () => {
    // Define progress and scale with their type as Animated.SharedValue<number>
    const progress = useSharedValue<number>(1);
    const scale = useSharedValue<number>(2);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: (progress.value * SIZE) / 2,
            transform: [
                { scale: scale.value },
                { rotate: _handleRotation(progress) }
            ]
        };
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,1)" }}>
            <View style={styles.container}>
                <Animated.View
                    style={[{
                        height: SIZE, width: SIZE, backgroundColor: "blue",
                    }, animatedStyle]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,1)"
    }
});

export default RotatingScalingSpringAnimation;
