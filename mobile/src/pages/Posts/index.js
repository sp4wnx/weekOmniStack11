import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Posts() {
  const [posts, setPost] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(post) {
    navigation.navigate('Detail', { post });
  }

  async function loadPosts() {
    if (loading) {
      return;
    }

    if (total > 0 && posts.length === total) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.get('posts', {
        params: { page }
      });
      setPost([...posts, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
    } catch (error) {
      alert(`Error trying to get posts, please try again later. ERROR Message: ${error.message}`);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total Posts <Text style={styles.headerTextBold}>{total}</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose one of the posts and help an animal!</Text>

      <FlatList
        style={styles.postList}
        data={posts}
        keyExtractor={post => String(post.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPosts}
        onEndReachedThreshold={0.2}
        renderItem={({item: post}) => (
          <View style={styles.post}>
            <Text style={styles.postProperty}>ONG: </Text>
            <Text style={styles.postValue}>{post.name}</Text>

            <Text style={styles.postProperty}>Title: </Text>
            <Text style={styles.postValue}>{post.title}</Text>

            <Text style={styles.postProperty}>Cost:</Text>
            <Text style={styles.postValue}>{Intl
                .NumberFormat('en-NL', { 
                  style: 'currency', 
                  currency: 'EUR'
                }).format(post.value)}
            </Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(post)}>
              <Text style={styles.detailsButtonText}>More Details</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}