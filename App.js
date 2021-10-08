import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, CheckBox } from 'react-native';


export default function App() {
	const [items, setItems] = useState([]);
	const [newItemText, setNewItemText] = useState("");

	const generateList = items.map((item, index) => (
		<View key={index} style={styles.listItemContainer}>
      <Text style={styles.item}>
        <CheckBox
          style={styles.checkBox}
          key={index}
          onValueChange={() => removeItemFromList(index)}
        />
        {item.todo}
      </Text>
		</View>
	));

  // Checking for duplicates
  const checkIfSame = () => {
    // Trimming newItemText and setting it to lowercase
    let loweredTrimmedText = newItemText.toLocaleLowerCase().trim();

    for (let i = 0; i < items.length; i++) {
      if (items[i].todo.toLocaleLowerCase() === loweredTrimmedText) {
        return true; // A response of true means the item is already on the list
      } else {
        return false; // A response of false allows the new item to be added to the list
      }
    }
  }

  const removeItemFromList = (task) => {
    setItems(items.filter((value, index) => index != task));
    console.log(task.todo + " has been removed.");
  };

	const addToList = () => {
		setItems([...items, {todo: newItemText.trim()}]);
		setNewItemText("");
	}

// Checking for a valid input
	const checkIfValid = () => {
    let trimmedText = newItemText.trim(); // Trimmed version of input

    // Doesn't allow for empty input
    if (trimmedText.length == 0) {
      console.log('Your Input is empty. Please enter something.');
      return false;
    }

    // Doesn't allow for only numbers
    if (!isNaN(trimmedText)) {
      console.log('Numbers alone are not allowed.');
      return false;
    }

    // Doesn't allow for special characters
    if (!(/^[a-zA-Z0-9]*$/.test(trimmedText))) {
      console.log('No special characters allowed.');
      return false;
    }

    if (checkIfSame()) {
      console.log(trimmedText + " already exists.");
    } else {
      addToList(); // If false the item will be added to array
    }
	} 

return (
	<View style={styles.container}>
	<Text style={styles.header}>Todo List</Text>
    <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          onChangeText = {text => setNewItemText(text)}
          value = {newItemText}
        />
        <View style={styles.btnWrap}>
        <Button
            color="#7ca814"
            title="Add Item"
            onPress={checkIfValid}
        />

        <Button 
            title="Clear"
            onPress={()=> setNewItemText("")}
        />
        </View>
    </View>

    <ScrollView style={styles.listWrap}>
        {generateList}
    </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#333',
  },
  inputWrap: {
    backgroundColor: '#232323',
    width: '100%',
    // display: 'flex',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#121212',
    padding: '0.2em',
    // fontSize: '2em',
    // lineHeight: '2em',
    width: '100%',
    textAlign: 'center',
    color: '#7ca814',
    fontWeight: 'bold'
  },
  input: {
    // border: '2px solid #000',
    padding: 5,
    width: '70%',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#dedede',
    borderRadius: 5,
    alignSelf: 'center',
  },
  listWrap: {
    display: 'flex',
    width: '100%',
    height: '400px',
  },
  listItemContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    margin: 'auto',
  },
  item: {
    color: '#fff',
  },
  btnWrap: {
    width: '70%',
    margin: 'auto'
  },
  checkBox: {
    marginRight: 20,
  }
});
