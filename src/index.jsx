import { useFonts } from 'expo-font';
import { useState } from 'react';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';

import { theme } from './constants/theme';
import { Game, StartGame, GameOver } from './screens';
import { styles } from './styles';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [loaded] = useFonts({
    'Epilogue-Regular': require('../assets/fonts/Epilogue-Regular.ttf'),
    'Epilogue-Bold': require('../assets/fonts/Epilogue-Bold.ttf'),
  });

  if (!loaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const onStartGame = (number) => {
    setUserNumber(number);
  };

  const onGameOver = (rounds) => {
    setGuessRounds(rounds);
  };

  const onRestart = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const Content = () => {
    if (guessRounds)
      return <GameOver rounds={guessRounds} choice={userNumber} onRestart={onRestart} />;
    if (userNumber) return <Game userNumber={userNumber} onGameOver={onGameOver} />;
    return <StartGame onStartGame={onStartGame} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Content />
    </SafeAreaView>
  );
}
