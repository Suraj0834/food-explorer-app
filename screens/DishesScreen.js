import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Dimensions 
} from "react-native";
import { MEALS, CATEGORIES } from "../utils/dummy-data";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";

const { width } = Dimensions.get('window');

const DishesScreen = ({ route }) => {
  const navigation = useNavigation();
  const filteredData = MEALS.filter((item) => {
    return item.categories.includes(route.params.categoryId);
  });

  const handleDishPress = (dish) => {
    navigation.navigate("DisheDetail", {
      mealId: dish.id,
    });
  };

  const getCategoryTitle = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.title : 'Dishes';
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title={getCategoryTitle(route.params.categoryId)}
        showBack={true}
        onBackPress={() => navigation.goBack()}
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
          <Text style={styles.title}>
            {filteredData.length} {filteredData.length === 1 ? 'Dish' : 'Dishes'} Found
          </Text>
          <Text style={styles.subtitle}>
            Discover amazing recipes in this category
          </Text>
        </View>

        <View style={styles.dishesList}>
          {filteredData.map((dish, index) => (
            <Card
              key={dish.id}
              style={styles.dishCard}
              onPress={() => handleDishPress(dish)}
            >
              <View style={styles.dishContent}>
                <Image
                  style={styles.dishImage}
                  source={{ uri: dish.imageUrl }}
                  resizeMode="cover"
                />
                
                <View style={styles.dishInfo}>
                  <Text style={styles.dishTitle} numberOfLines={2}>
                    {dish.title}
                  </Text>
                  
                  <View style={styles.dishMeta}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>⏱️</Text>
                      <Text style={styles.metaText}>{dish.duration} min</Text>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>💰</Text>
                      <Text style={styles.metaText}>
                        {dish.affordability.charAt(0).toUpperCase() + dish.affordability.slice(1)}
                      </Text>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>🎯</Text>
                      <Text style={styles.metaText}>
                        {dish.complexity.charAt(0).toUpperCase() + dish.complexity.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.dietaryInfo}>
                    {dish.isGlutenFree && (
                      <View style={styles.dietaryTag}>
                        <Text style={styles.dietaryText}>GF</Text>
                      </View>
                    )}
                    {dish.isVegan && (
                      <View style={styles.dietaryTag}>
                        <Text style={styles.dietaryText}>Vegan</Text>
                      </View>
                    )}
                    {dish.isVegetarian && (
                      <View style={styles.dietaryTag}>
                        <Text style={styles.dietaryText}>Veg</Text>
                      </View>
                    )}
                    {dish.isLactoseFree && (
                      <View style={styles.dietaryTag}>
                        <Text style={styles.dietaryText}>LF</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  dishesList: {
    paddingHorizontal: 16,
  },
  dishCard: {
    marginBottom: 16,
    padding: 0,
    overflow: 'hidden',
  },
  dishContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  dishInfo: {
    flex: 1,
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
    lineHeight: 20,
  },
  dishMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#757575',
  },
  dietaryInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  dietaryText: {
    fontSize: 10,
    color: '#075E54',
    fontWeight: '500',
  },
});

export default DishesScreen;
