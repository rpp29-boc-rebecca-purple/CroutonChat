import { StyleSheet } from 'react-native'

// This is the global stylesheet
// usage, you import this file to your component
// call items in here with style={styles.(var name)}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  font: {
    fontSize: 18
  },
  test: {
    fontSize: 30
  }
});
