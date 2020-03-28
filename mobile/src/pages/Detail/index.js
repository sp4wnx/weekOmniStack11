import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const message = `Hi ${post.name}, I am getting in contact to help the post ${post.title} with the cost ${Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR' }).format(post.value)}.`;
  const post = route.params.post;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the post: ${post.title}`,
      recipients: [post.email],
      body: message
    })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${post.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.post}>
        <Text style={[styles.postProperty, { marginTop: 0 }]}>ONG: </Text>
        <Text style={styles.postValue}>{post.name} from {post.city}/{post.state}</Text>

        <Text style={styles.postProperty}>Title: </Text>
        <Text style={styles.postValue}>{post.title}</Text>

        <Text style={styles.postProperty}>Cost:</Text>
        <Text style={styles.postValue}>{Intl
          .NumberFormat('en-NL', {
            style: 'currency',
            currency: 'EUR'
          }).format(post.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this Post.</Text>

        <Text style={styles.heroDescription}>Send us a message:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}