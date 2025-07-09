import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Dimensions 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CATEGORIES } from "../utils/dummy-data";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";

const { width } = Dimensions.get('window');

const CategoryScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    navigation.navigate("DishList", {
      categoryId: category.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title="Food Categories" 
        onCameraPress={() => navigation.navigate("Camera")}
        onSearchPress={() => navigation.navigate("Search")}
        onProfilePress={() => navigation.navigate("Profile")}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Explore Cuisines</Text>
          <Text style={styles.subtitle}>
            Discover delicious dishes from around the world
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((category, index) => (
            <Card
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category)}
            >
              <View 
                style={[
                  styles.categoryIcon, 
                  { backgroundColor: category.color }
                ]}
              >
                <Text style={styles.categoryEmoji}>
                  {getCategoryEmoji(category.title)}
                </Text>
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categorySubtitle}>
                {getCategoryDescription(category.title)} dishes
              </Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getCategoryEmoji = (title) => {
  const emojiMap = {
    'Italian': '🍝',
    'Quick & Easy': '⚡',
    'Hamburgers': '🍔',
    'German': '🥨',
    'Light & Lovely': '🥗',
    'Exotic': '🌶️',
    'Breakfast': '🥞',
    'Asian': '🍜',
    'French': '🥐',
    'Summer': '🍹'
  };
  return emojiMap[title] || '🍽️';
};

const getCategoryDescription = (title) => {
  const descriptionMap = {
    'Italian': 'Authentic Italian',
    'Quick & Easy': 'Fast & Simple',
    'Hamburgers': 'Juicy Burger',
    'German': 'Traditional German',
    'Light & Lovely': 'Healthy & Fresh',
    'Exotic': 'Spicy & Bold',
    'Breakfast': 'Morning Delights',
    'Asian': 'Asian Fusion',
    'French': 'Elegant French',
    'Summer': 'Refreshing Summer'
  };
  return descriptionMap[title] || 'Delicious';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#075E54',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
});

export default CategoryScreen;
