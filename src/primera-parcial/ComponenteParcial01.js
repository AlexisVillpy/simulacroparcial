import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ComponenteParcial01 = ({ navigation }) => {
  const [materia, setMateria] = useState('');
  const [nota, setNota] = useState('');
  const [items, setItems] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const agregarItem = () => {
    if (materia.trim() && nota.trim()) {
      setItems([...items, { id: Math.random().toString(), materia, nota }]);
      setMateria('');
      setNota('');
    } else {
      alert('Por favor, ingresa la materia y la nota.');
    }
  };

  const navegarAPropsParcial02 = () => {
    navigation.navigate('PropsParcial02', { materia, nota });
  };
  

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log('Usuarios obtenidos:', response.data); // Verifica que los datos lleguen
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al traer los usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  console.log('Estado usuarios:', usuarios); // Verifica el estado

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.apiTitle]}>Examen Primera Parcial</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Ingresar materia"
        placeholderTextColor="#000"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresar nota"
        placeholderTextColor="#000"
        value={nota}
        keyboardType="numeric"
        onChangeText={setNota}
      />
      <Button title="Agregar" onPress={agregarItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.materia} - Nota: {item.nota}</Text>
          </View>
        )}
      />

<Button title="Navegar a PropsParcial02" onPress={navegarAPropsParcial02} />


      <Text style={[styles.title, styles.apiTitle]}>Usuarios desde la API</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Username: {item.username}</Text>
            <Text style={styles.itemText}>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  apiTitle: {
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#000', // Color del texto en el TextInput
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    color: '#000',
  },
});

export default ComponenteParcial01;
