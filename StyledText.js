import * as React from 'react';
import { Text, TextProps } from './Themed';

/**
 * Default text theme created by Expo ('expo init').
 */
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
