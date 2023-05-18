import { Button, Image, Text, View } from 'react-native';

import { styles } from './styles';
import { Card, Header } from '../../components';
import { theme } from '../../constants/theme';

const GameOver = ({ rounds, choice, onRestart }) => {
  return (
    <View style={styles.container}>
      <Header title="GAME OVER!" />
      <Image
        style={styles.image}
        source={require('../../../assets/gameover.png')}
        resizeMode="cover"
      />
      <Card style={styles.resultContainer}>
        <Text style={styles.resultText}>Intentos: {rounds}</Text>
        <Text style={styles.resultText}>El numero era: {choice}</Text>
      </Card>
      <Button title="JUGAR DE NUEVO" onPress={onRestart} color={theme.colors.black} />
    </View>
  );
};

export default GameOver;
