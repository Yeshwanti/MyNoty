import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  StatusBar,
  SafeAreaView 
} from 'react-native';
import NoteInput from './components/NoteInput';
import NoteItem from './components/NoteItem';

export default function App() {
  // State to store all notes - each note has id, title, and description
  const [notes, setNotes] = useState([]);

  /**
   * Add a new note to the notes array
   * @param {string} title - The title of the note
   * @param {string} description - The description/content of the note
   */
  const addNoteHandler = (title, description) => {
    // Create new note object with unique ID (timestamp)
    const newNote = {
      id: Date.now().toString(),
      title: title,
      description: description,
    };
    
    // Add new note to the beginning of the array
    setNotes(currentNotes => [newNote, ...currentNotes]);
  };

  /**
   * Delete a note by its ID
   * @param {string} id - The unique ID of the note to delete
   */
  const deleteNoteHandler = (id) => {
    // Filter out the note with matching ID
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar styling */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <Text style={styles.headerSubtitle}>
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </Text>
      </View>

      {/* Note Input Component */}
      <NoteInput onAddNote={addNoteHandler} />

      {/* Notes List */}
      <View style={styles.notesContainer}>
        {notes.length === 0 ? (
          // Empty state message when no notes exist
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notes yet!</Text>
            <Text style={styles.emptySubtext}>Add your first note above</Text>
          </View>
        ) : (
          // FlatList to render all notes efficiently
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <NoteItem
                id={itemData.item.id}
                title={itemData.item.title}
                description={itemData.item.description}
                onDelete={deleteNoteHandler}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
});
