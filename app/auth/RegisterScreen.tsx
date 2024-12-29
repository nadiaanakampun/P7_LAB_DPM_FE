import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/config";
import Icon from "react-native-vector-icons/FontAwesome";  // Install FontAwesome icon library

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      Alert.alert("Registration Successful", "You can now log in");
      router.replace("/auth/LoginScreen");
    } catch (error) {
      Alert.alert("Registration Failed", (error as any).response?.data?.message || "An error occurred");
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
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us and get started</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#007BFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Register Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.registerButton}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Back to Login Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/auth/LoginScreen")}
      >
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
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
  registerButton: {
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
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
