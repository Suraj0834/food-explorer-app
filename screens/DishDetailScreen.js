import React from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  Dimensions 
} from "react-native";
import { MEALS } from "../utils/dummy-data";
import UnOrderedList from "../components/UnOrderedList";
import AppHeader from "../components/AppHeader";
import Card from "../components/Card";

const { width } = Dimensions.get('window');

const DishDetailScreen = ({ route, navigation }) => {
  const meal = MEALS.find((item) => item.id == route.params.mealId);

  if (!meal) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader 
          title="Dish Not Found"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Dish not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title="Recipe Details"
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.dishImage}
            source={{ uri: meal.imageUrl }}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.dishTitle}>{meal.title}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>⏱️</Text>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{meal.duration} min</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>💰</Text>
                <Text style={styles.infoLabel}>Cost</Text>
                <Text style={styles.infoValue}>
                  {meal.affordability.charAt(0).toUpperCase() + meal.affordability.slice(1)}
                </Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoIcon}>🎯</Text>
                <Text style={styles.infoLabel}>Complexity</Text>
                <Text style={styles.infoValue}>
                  {meal.complexity.charAt(0).toUpperCase() + meal.complexity.slice(1)}
                </Text>
              </View>
            </View>
          </Card>

          <Card style={styles.dietaryCard}>
            <Text style={styles.sectionTitle}>Dietary Information</Text>
            <View style={styles.dietaryTags}>
              {meal.isGlutenFree && (
                <View style={styles.dietaryTag}>
                  <Text style={styles.dietaryText}>Gluten Free</Text>
                </View>
              )}
              {meal.isVegan && (
                <View style={styles.dietaryTag}>
                  <Text style={styles.dietaryText}>Vegan</Text>
                </View>
              )}
              {meal.isVegetarian && (
                <View style={styles.dietaryTag}>
                  <Text style={styles.dietaryText}>Vegetarian</Text>
                </View>
              )}
              {meal.isLactoseFree && (
                <View style={styles.dietaryTag}>
                  <Text style={styles.dietaryText}>Lactose Free</Text>
                </View>
              )}
            </View>
          </Card>

          <Card style={styles.ingredientsCard}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <UnOrderedList data={meal.ingredients} />
          </Card>

          <Card style={styles.stepsCard}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.stepsList}>
              {meal.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </Card>
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
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  dishImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  dishTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  infoCard: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  dietaryCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#075E54',
    marginBottom: 12,
  },
  dietaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  dietaryText: {
    fontSize: 12,
    color: '#075E54',
    fontWeight: '500',
  },
  ingredientsCard: {
    marginBottom: 16,
  },
  stepsCard: {
    marginBottom: 16,
  },
  stepsList: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#757575',
  },
});

export default DishDetailScreen;
