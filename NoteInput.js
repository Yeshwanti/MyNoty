import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

/**
 * NoteInput Component
 * Handles the input form for creating new notes
 * @param {function} onAddNote - Callback function to add a note
 */
const NoteInput = ({ onAddNote }) => {
  // State for title input
  const [enteredTitle, setEnteredTitle] = useState('');
  // State for description input
  const [enteredDescription, setEnteredDescription] = useState('');

  /**
   * Handle the "Add Note" button press
   * Validates input and calls the parent's addNote function
   */
  const addNoteHandler = () => {
    // Trim whitespace from inputs
    const title = enteredTitle.trim();
    const description = enteredDescription.trim();

    // Validate that both fields are filled
    if (title.length === 0 || description.length === 0) {
      Alert.alert(
        'Invalid Input',
        'Please enter both title and description',
        [{ text: 'Okay' }]
      );
      return;
    }

    // Call parent function to add note
    onAddNote(title, description);

    // Clear input fields after adding
    setEnteredTitle('');
    setEnteredDescription('');
  };

  return (
    <View style={styles.inputContainer}>
      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        placeholderTextColor="#999"
        value={enteredTitle}
        onChangeText={setEnteredTitle}
        maxLength={50}
      />

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Note Description"
        placeholderTextColor="#999"
        value={enteredDescription}
        onChangeText={setEnteredDescription}
        multiline={true}
        numberOfLines={3}
        maxLength={200}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addNoteHandler}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  addButton: {
    backgroundColor: '#9b7dd4',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#9b7dd4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NoteInput;
