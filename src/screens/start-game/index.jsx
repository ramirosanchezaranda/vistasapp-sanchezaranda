import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { styles } from './styles';
import { Card, Header, NumberContainer } from '../../components';
import { theme } from '../../constants/theme';

const StartGame = ({ onStartGame }) => {
  const [numberSelected, setNumberSelected] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const onHandlerChangeText = (text) => {
    if (/[^0-9]/g.test(text)) return;
    setNumberSelected(text.replace(/[^0-9]/g), '');
  };

  const handlerResetInput = () => {
    setNumberSelected('');
    setConfirmed(false);
  };

  const handlerConfirmInput = () => {
    const choseNumber = parseInt(numberSelected);
    if (choseNumber < 1 || choseNumber > 99 || isNaN(choseNumber)) {
      Alert.alert('Numero invalido', 'Debe estar entre 1 y 99', [
        { text: 'Okay', style: 'destructive', onPress: () => setNumberSelected('') },
      ]);
      return;
    }
    setConfirmed(true);
  };

  const handlerOnStartGame = () => {
    onStartGame(numberSelected);
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedOutput}>
        <Text style={styles.confirmedOutputText}>Seleccionaste el num:</Text>
        <NumberContainer number={numberSelected} />
        <Button title="EMPEZAR" color={theme.colors.green} onPress={handlerOnStartGame} />
      </Card>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.container}>
            <Header title="WELCOME!" />
            <Text style={styles.title}>START GAME</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.label}>Write a number</Text>
              <TextInput
                placeholder="0"
                style={styles.input}
                keyboardType="number-pad"
                maxLength={2}
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit
                onChangeText={onHandlerChangeText}
                value={numberSelected}
                editable={!confirmed}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="reset"
                  onPress={handlerResetInput}
                  color={theme.colors.secondary}
                  disabled={numberSelected === ''}
                />
                <Button
                  title="Confirm"
                  onPress={handlerConfirmInput}
                  color={theme.colors.secondary}
                  disabled={numberSelected === ''}
                />
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StartGame;
