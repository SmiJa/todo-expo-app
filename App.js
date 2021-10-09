import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, CheckBox } from 'react-native';


export default function App() {
  /********************************
  * Setting States
  *********************************/
	const [items, setItems] = useState([]);
	const [newItemText, setNewItemText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  /********************************
  * Setting States
  ********************************/
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

  /********************************
  * Helper Functions
  ********************************/
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
    console.log("Item has been removed.");
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
      setShowSuccess(false);
      setShowFail(true);
      return false;
    }

    // Doesn't allow for only numbers
    if (!isNaN(trimmedText)) {
      setShowSuccess(false);
      setShowFail(true);
      return false;
    }

    // Doesn't allow for special characters
    if (!(/^[a-zA-Z0-9- ]*$/.test(trimmedText))) {
      setShowSuccess(false);
      setShowFail(true);
      return false;
    }

    if (checkIfSame()) {
      setShowSuccess(false);
      setShowFail(true);
    } else {
      addToList(); // If false the item will be added to array
      setShowFail(false);
      setShowSuccess(true);
      console.log(showSuccess);
    }
	}

  /********************************
  * Main App Render
  ********************************/
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inputWrap}>
          { showSuccess && 
            <View style={styles.successMessage}>
              <Text>Your Item has been added to the list</Text>
            </View>
          }
          { showFail && 
            <View style={styles.failMessage}>
              <Text>Item is either already on the list, or is incorrect input</Text>
            </View>
          }
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

  /********************************
  * Styles
  ********************************/

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
      display: 'flex',
      paddingBottom: 20,
    },
    header: {
      backgroundColor: '#121212',
      padding: '0.1em',
      fontSize: '1.5em',
      lineHeight: '1.5em',
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
      width: '90%',
      Height: '200px'
    },
    listItemContainer: {
      width: '100%',
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.3)',
      marginTop: 8,
    },
    item: {
      color: '#fff',
    },
    btnWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '70%',
      margin: 'auto'
    },
    checkBox: {
      marginRight: 20,
    },
    dialogWrap: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '2',
    },
    dialog: {
      backgroundColor: "#dedede",
      padding: 20,
      borderRadius: 8,
    },
    buttonsWrap: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 30,
    },
    successMessage: {
      backgroundColor: '#20b550',
      textAlign: 'center',
    },
    failMessage: {
      backgroundColor: '#b52134',
      textAlign: 'center',
    }
  }
);
