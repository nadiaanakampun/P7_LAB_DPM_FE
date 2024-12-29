import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";
import Icon from "react-native-vector-icons/FontAwesome";  // Install FontAwesome icon library

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token } = response.data.data;
      await AsyncStorage.setItem("token", token);
      router.replace("/(tabs)"); // Prevent back navigation to login
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "An error occurred";
      Alert.alert("Login Failed", errorMessage);
    }
  };

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
    <ThemedView style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
      </View>
      
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/auth/RegisterScreen")}
      >
        <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
    backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",  // Gradient background
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    width: "90%",
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  inputIcon: {
    marginRight: 10,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
