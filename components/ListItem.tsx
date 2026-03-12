
import React, { useRef, useEffect } from "react";
import * as Haptics from "expo-haptics";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { appleRed, borderColor } from "@/constants/Colors";
import { IconCircle } from "./IconCircle";
import { IconSymbol } from "./IconSymbol";

export default function ListItem({ listId }: { listId: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Fade-in on mount using built-in Animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, []);

  const RightAction = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-200, -20],
      outputRange: [1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Pressable
        onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
          console.log("delete");
        }}
      >
        <Animated.View style={[styles.rightAction, { transform: [{ scale }] }]}>
          <IconSymbol name="trash.fill" size={24} color="white" />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Swipeable
        key={listId}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        overshootRight={false}
      >
        <View style={styles.listItemContainer}>
          <Text
            style={[
              styles.listItemText,
              { color: isDark ? "#FFFFFF" : "#000000" },
            ]}
          >
            {listId}
          </Text>
        </View>
      </Swipeable>
    </Animated.View>
  );
}

export const NicknameCircle = ({
  nickname,
  color,
  index = 0,
  isEllipsis = false,
}: {
  nickname: string;
  color: string;
  index?: number;
  isEllipsis?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Text
      style={[
        styles.nicknameCircle,
        isEllipsis && styles.ellipsisCircle,
        {
          backgroundColor: color,
          borderColor: isDark ? "#000000" : "#ffffff",
          marginLeft: index > 0 ? -6 : 0,
        },
      ]}
    >
      {isEllipsis ? "..." : nickname[0].toUpperCase()}
    </Text>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    backgroundColor: "transparent",
  },
  listItemText: {
    fontSize: 16,
  },
  rightAction: {
    width: 200,
    height: 65,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
  nicknameCircle: {
    fontSize: 12,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    padding: 1,
    width: 24,
    height: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  ellipsisCircle: {
    lineHeight: 0,
    marginLeft: -6,
  },
});
