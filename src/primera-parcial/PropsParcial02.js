import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  console.log('PropsParcial02 route.params:', route.params); // Verifica los parámetros recibidos

  const { materia = 'Materia no proporcionada', nota = 'Nota no proporcionada' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        En la materia: {materia}, recibí la siguiente nota: {nota}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#000', // Color negro para el texto
  },
});

export default PropsParcial02;
