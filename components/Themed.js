import * as React from 'react';
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, ScrollView as DefaultScrollView } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/**
 * Default colour theme function created by Expo ('expo init'). Allows light/dark mode for components depending on user's
 * global device light/dark mode setting.
 */
export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: Colors.light & Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText;
export type ViewProps = ThemeProps & DefaultView;
export type TextInputProps = ThemeProps & DefaultTextInput;
export type ScrollViewProps = ThemeProps & DefaultScrollView;

/**
 * Defines <Text/> colour themes.
 * @param props
 * @returns {JSX.Element}
 */
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

/**
 * Defines <View/> colour themes.
 * @param props
 * @returns {JSX.Element}
 */
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

/**
 * Defines <TextInput/> colour themes.
 * @param props
 * @returns {JSX.Element}
 */
export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTextInput style={[{ backgroundColor }, style]} {...otherProps} />;
}

/**
 * Defines <ScrollView/> colour themes.
 * @param props
 * @returns {JSX.Element}
 */
export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}