import React from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const NavBar = props => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={{ flex: 1, borderRightWidth: 0.5, alignItems: "center" }}
        onPress={props.loadSearchContainer}
      >
        <Text style={{ fontSize: 30, padding: 5, color: "white" }}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, alignItems: "center" }}
        onPress={props.loadTopPackContainer}
      >
        <Text style={{ fontSize: 30, padding: 5, color: "white" }}>
          Toppacks
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 50,
    backgroundColor: "#0099ff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  }
});
export default NavBar;
