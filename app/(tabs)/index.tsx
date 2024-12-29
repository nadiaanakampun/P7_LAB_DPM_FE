import React from "react";
import { Image, StyleSheet, Platform, TouchableOpacity, View, Animated } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const buttonScale = new Animated.Value(1);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#87CEFA", dark: "#0A2540" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Create a Website Without Limits</ThemedText>
      </ThemedView>

      <View style={styles.buttonsContainer}>
        {['Online Store', 'Portfolio', 'Blog', 'Consultant', 'Service Business', 'Restaurant', 'Event', 'Other'].map((label, index) => (
          <Animated.View key={index} style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.button}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
            >
              <ThemedText style={styles.buttonText}>{label}</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity style={styles.getStartedButton}>
        <ThemedText style={styles.getStartedText}>Get Started</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    margin: 6,
    elevation: 5, // adds shadow on Android
    shadowColor: "#000", // adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    color: "#0A2540",
    fontWeight: "600",
    textAlign: "center",
  },
  getStartedButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 24,
    elevation: 5,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  getStartedText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: "absolute",
    bottom: 0,
    left: 0,
    resizeMode: "contain",
    opacity: 0.7,
  },
});
