import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';

const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  // Здесь мы создаем основной компонент приложения App. Мы также используем хук useState.
  // Для создания состояний, query и books, которые будут использоваться в других частях приложения.

  const searchBooks = async () => {
    try {
      const response = await fetch(`http://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error(error);
    }
  };


  //Эта функция использует ключевое слово async/await, чтобы получить данные с сервера Open Library. Она также использует try/catch, чтобы обработать возможные ошибки.
  const handleBookPress = (bookKey) => {
    const url = `http://openlibrary.org${bookKey}`;
    Linking.openURL(url);
  };

  // Эта функция будет вызываться, когда пользователь нажимает на книгу в списке. Она открывает URL-адрес книги в браузере.
  const renderBooks = () => {
    return books.map((book) => {
      const imageURL = `http://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`;
      return (
        <TouchableOpacity key={book.key} onPress={() => handleBookPress(book.key)}>
          <View style={styles.bookContainer}>
            <Image source={{ uri: imageURL }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.title}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  // Эта функция отображает список книг. Она использует map для прохода по массиву книг и отображения их в качестве элементов списка.
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Search Books"
      />

      <Button title="Search" style={{ marginTop: 10, marginBottom: 10 }} onPress={searchBooks} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.booksContainer}>{renderBooks()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    marginTop: 50,
    paddingLeft: 10,
    fontSize: 20,
  },
  bookContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bookImage: {
    height: 200,
    width: 150,
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  booksContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default App;
