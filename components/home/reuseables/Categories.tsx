import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { categories } from "@/utils/Categories";
import colors from "@/constants/Colors";
import CategorySelector from "./CategorySelector";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import {
  homeNavigatorStackParamListMini,
  libraryNavigatorStackParamListMini,
} from "@/@types/navigation";
const categoriesSub = [
  { name: "Mathematics", icon: "calculator" },
  { name: "Physics", icon: "atom" },
  { name: "Business", icon: "chart-line" },
  { name: "Computer", icon: "laptop-code" },
  { name: "Science", icon: "flask" },
  { name: "Others", icon: "ellipsis-h" },
];

const Categories = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigation =
    useNavigation<NavigationProp<homeNavigatorStackParamListMini>>();
  const handleOthers = (category: string) => {
    navigation.navigate("HomePage", {
      screen: "CategoriesPreviewPage",
      params: { category: category }, // Pass any necessary parameters
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText} variant="titleLarge">
            Categories
          </Text>
        </View>
        <View style={styles.grid}>
          {categoriesSub.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryBox}
              onPress={() => {
                category.name === "Others" && category.icon
                  ? setShowCategoryModal(true)
                  : null;

                if (!(category.name === "Others"))
                  navigation.navigate("HomePage", {
                    screen: "CategoriesPreviewPage",
                    params: { category: category.name }, // Pass any necessary parameters
                  });
              }}
            >
              <FontAwesome5 name={category.icon} size={24} color="black" />
              <Text style={styles.categoryText}>{category.name}</Text>
              {category.name === "Others" && category.icon === "ellipsis-h" ? (
                <CategorySelector
                  visible={showCategoryModal}
                  onRequestClose={() => {
                    setShowCategoryModal(false);
                  }}
                  title="Category"
                  data={categories}
                  renderItem={(item) => {
                    return <Text style={styles.category}>{item}</Text>;
                  }}
                  handleOthers={handleOthers}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryBox: {
    width: "30%", // Adjust the width to fit 3 columns
    aspectRatio: 1, // Make it a square
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    padding: 16,
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
});

export default Categories;
