import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { CATEGORIES } from "../utils/dummy-data";
import { logoutUser } from "../slices/userSlice";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCategoryPress = (category) => {
    navigation.navigate("DishList", {
      categoryId: category.id,
    });
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(logoutUser()).unwrap();
            } catch (error) {
              console.log("Logout error:", error);
            }
          }
        }
      ]
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Food Explorer</Text>
          <Text style={styles.heroSubtitle}>
            Discover amazing recipes from around the world
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{CATEGORIES.length}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Cuisines</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate("Category")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>🔍</Text>
            <Text style={styles.quickActionText}>Browse All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => Alert.alert("Coming Soon", "Search feature will be available soon!")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>⭐</Text>
            <Text style={styles.quickActionText}>Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => Alert.alert("Coming Soon", "Recent recipes will be available soon!")}
            activeOpacity={0.8}
          >
            <Text style={styles.quickActionIcon}>🕒</Text>
            <Text style={styles.quickActionText}>Recent</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Explore your favorite cuisines
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.slice(0, 6).map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.8}
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
                {getCategoryDescription(category.title)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Special</Text>
          <Text style={styles.sectionSubtitle}>
            Handpicked recipes for you
          </Text>
        </View>

        <Card style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <View style={styles.featuredText}>
              <Text style={styles.featuredTitle}>Italian Pasta</Text>
              <Text style={styles.featuredDescription}>
                Discover authentic Italian pasta recipes that will transport you to Italy
              </Text>
              <TouchableOpacity
                style={styles.featuredButton}
                onPress={() => handleCategoryPress(CATEGORIES[0])}
                activeOpacity={0.8}
              >
                <Text style={styles.featuredButtonText}>Explore Italian</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.featuredIcon}>
              <Text style={styles.featuredEmoji}>🍝</Text>
            </View>
          </View>
        </Card>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getCategoryDescription = (title) => {
  const descriptionMap = {
    'Italian': 'Authentic',
    'Quick & Easy': 'Fast & Simple',
    'Hamburgers': 'Juicy',
    'German': 'Traditional',
    'Light & Lovely': 'Healthy',
    'Exotic': 'Spicy & Bold',
    'Breakfast': 'Morning',
    'Asian': 'Fusion',
    'French': 'Elegant',
    'Summer': 'Refreshing'
  };
  return descriptionMap[title] || 'Delicious';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heroSection: {
    backgroundColor: '#075E54',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E8F5E8',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#075E54',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
  },
  seeAllText: {
    fontSize: 14,
    color: '#075E54',
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
  },
  featuredCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredButton: {
    backgroundColor: '#075E54',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredIcon: {
    marginLeft: 16,
  },
  featuredEmoji: {
    fontSize: 48,
  },
  logoutSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default HomeScreen;
