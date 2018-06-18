import React, { Component } from "react";
import axios from "axios";
import { Text, View, Button, StyleSheet } from "react-native";

const TopPackContainer = props => {
  const B = props => (
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.children}</Text>
  );
  let deleteBtn = null;
  let topPacks = null;
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
  if (props.topPacks.length > 0) {
    deleteBtn = (
      <View style={styles.deleteBtnContianer}>
        <View style={styles.deleteBtn}>
          <Button title="Delete Data" onPress={props.handleDataDeletion} />
        </View>
      </View>
    );
  }
  return (
    <View style={{ margin: 10, flex: 1 }}>
      {topPacks}
      {deleteBtn}
    </View>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    height: 30,
    width: 100
  },
  deleteBtnContianer: {
    justifyContent: "center",
    alignItems: "center"
  },
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
