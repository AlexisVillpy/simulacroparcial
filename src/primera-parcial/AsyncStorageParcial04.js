import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [materia, setMateria] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    leerDatos();
  }, []);

  const guardarDatos = async () => {
    const nuevoDato = { codigo, carrera, materia };
    const nuevosDatos = [...datos, nuevoDato];
    setDatos(nuevosDatos);
    await AsyncStorage.setItem('datos', JSON.stringify(nuevosDatos));
    setCodigo('');
    setCarrera('');
    setMateria('');
  };

  const leerDatos = async () => {
    const almacenados = await AsyncStorage.getItem('datos');
    if (almacenados) {
      setDatos(JSON.parse(almacenados));
    }
  };

  const actualizarDatos = async (index) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index] = { codigo, carrera, materia };
    setDatos(nuevosDatos);
    await AsyncStorage.setItem('datos', JSON.stringify(nuevosDatos));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
      />
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <Button title="Guardar" onPress={guardarDatos} />
      <FlatList
        data={datos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.codigo} - {item.carrera} - {item.materia}</Text>
            <Button title="Actualizar" onPress={() => actualizarDatos(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default AsyncStorageParcial04;
