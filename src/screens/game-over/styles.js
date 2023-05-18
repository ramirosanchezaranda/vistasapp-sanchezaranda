import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../constants/theme';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  resultContainer: {
    marginBottom: 30,
    padding: 20,
    width: width * 0.75,
    alignItems: 'center',
  },
  image: {
    width: width * 0.75,
    height: height * 0.2,
  },
  resultText: {
    color: theme.colors.text,
    fontSize: theme.fonts.fontSize.text,
    fontFamily: theme.fonts.fontFamily.bold,
  },
});
