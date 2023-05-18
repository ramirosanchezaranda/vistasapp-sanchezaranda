import { useEffect, useRef, useState } from 'react';
import { Text, View, Button, Alert } from 'react-native';

import { styles } from './styles';
import { Header, Card, NumberContainer } from '../../components';
import { theme } from '../../constants/theme';

const MIN_NUMBER = 1;
const MAX_NUMBER = 99;
const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  return randomNumber;
};

const Game = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(MIN_NUMBER, MAX_NUMBER, userNumber)
  );

  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(MIN_NUMBER);
  const currentHigh = useRef(MAX_NUMBER);

  useEffect(() => {
    if (currentGuess == userNumber) onGameOver(rounds);
  }, [currentGuess, userNumber, onGameOver]);

  const handlerMenorButton = () => {
    if (currentGuess > userNumber) {
      currentHigh.current = currentGuess;
      const randomNumber = generateRandomNumber(
        currentLow.current,
        currentHigh.current,
        currentGuess
      );
      setCurrentGuess(randomNumber);
      setRounds((current) => current + 1);
    } else {
      Alert.alert('No es posible', 'Tu numero es MAYOR que ' + currentGuess, [
        { text: 'Ok', style: 'cancel' },
      ]);
    }
  };

  const handlerMayorButton = () => {
    if (currentGuess < userNumber) {
      currentLow.current = currentGuess;
      const randomNumber = generateRandomNumber(
        currentLow.current,
        currentHigh.current,
        currentGuess
      );
      setCurrentGuess(randomNumber);
      setRounds((current) => current + 1);
    } else {
      Alert.alert('No es posible', 'Tu numero es MENOR que ' + currentGuess, [
        { text: 'Ok', style: 'cancel' },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="GAME!" />
      <Card style={styles.cardContainer}>
        <Text style={styles.label}>El oponente cree que es el: </Text>
        <NumberContainer number={currentGuess} />
        <View style={styles.buttonContainer}>
          <Button
            title="MENOR"
            onPress={handlerMenorButton}
            color={theme.colors.secondary}
            disabled={currentGuess == userNumber}
          />
          <Button
            title="MAYOR"
            onPress={handlerMayorButton}
            color={theme.colors.secondary}
            disabled={currentGuess == userNumber}
          />
        </View>
      </Card>
    </View>
  );
};

export default Game;
