import { StyleSheet, TouchableOpacity} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.nameText}>Lesa J. Larson</ThemedText>
      <ThemedText type="subtitle" style={styles.emailText}>LesaJLarson@dayrep.com</ThemedText>

      <TouchableOpacity style={styles.editButton} onPress={() => alert('Edit Profile')}>
        <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
