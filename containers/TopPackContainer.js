import React, { Component } from "react";
import axios from "axios";
import { Text, View, StyleSheet } from "react-native";

const TopPackContainer = props => {
  const B = props => (
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.children}</Text>
  );
  let toppacks = null;
  topPacks = props.topPacks.slice(0, 10).map((entry, key) => {
    return (
      <View key={key} style={styles.packageContainer}>
        <Text style={styles.package}>
          <B>{entry.name}</B> is being used in <B>{entry.count}</B>
          {entry.count === 1 ? "reposotory" : "repositories"}
        </Text>
      </View>
    );
  });
  return <View style={{ flex: 1 }}>{topPacks}</View>;
};

const styles = StyleSheet.create({
  packageContainer: {
    justifyContent: "center",
    flex: 1,
    borderBottomWidth: 0.5,
    margin: 5,
    padding: 5
  },
  package: {
    fontSize: 18
  }
});
export default TopPackContainer;
