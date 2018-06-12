import React from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

const NavBar = props => {
  return (
    <View style={styles.navBar}>
      <Button onPress={() => {}} title="Search" />
      <Button onPress={() => {}} title="TopPacks" />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
export default NavBar;
