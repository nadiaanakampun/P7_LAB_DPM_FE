import React from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity, View, Animated } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
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
      headerBackgroundColor={{ light: '#87CEFA', dark: '#0A2540' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#FFFFFF"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Explore</ThemedText>
      </ThemedView>

      <ThemedText style={styles.exploreText}>
        This app includes example code to help you get started.
      </ThemedText>

      <View style={styles.collapsiblesContainer}>
        <Collapsible title="File-based routing">
          <ThemedText>
            This app has two screens:{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
          </ThemedText>
          <ThemedText>
            The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
            sets up the tab navigator.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Android, iOS, and web support">
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Images">
          <ThemedText>
            For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
            <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for different screen densities.
          </ThemedText>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
          <ExternalLink href="https://reactnative.dev/docs/images">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Custom fonts">
          <ThemedText>
            Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono' }}>custom fonts like this one.</ThemedText>
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Light and dark mode components">
          <ThemedText>
            This template has light and dark mode support. The{' '}
            <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect what the user's current color scheme is.
          </ThemedText>
          <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
            <ThemedText type="link">Learn more</ThemedText>
          </ExternalLink>
        </Collapsible>

        <Collapsible title="Animations">
          <ThemedText>
            This template includes an example of an animated component. The{' '}
            <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses the powerful{' '}
            <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library to create a waving hand animation.
          </ThemedText>
          {Platform.select({
            ios: (
              <ThemedText>
                The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText> component provides a parallax effect for the header image.
              </ThemedText>
            ),
          })}
        </Collapsible>
      </View>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
      >
        <ThemedText style={styles.getStartedText}>Start Exploring</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFFFF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  exploreText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 24,
  },
  collapsiblesContainer: {
    marginBottom: 24,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 24,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  getStartedText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});
