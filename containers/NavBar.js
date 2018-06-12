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
      <TouchableOpacity>
        <Text style={{ fontSize: 30, padding: 5 }}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ fontSize: 30, padding: 5 }}>Toppacks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: "#cfcfcf",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  }
});
export default NavBar;
