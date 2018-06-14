import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const DisplayRepositories = props => {
  const B = props => (
    <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.children}</Text>
  );
  let repositories = null;
  let renderRepoItem = ({ item }) => {
    return (
      <View key={item.id} style={[styles.repoContainer]}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.repoElements, { fontSize: 25 }]}>
            {item.name}
          </Text>
          <Text style={styles.repoElements}>Stars: {item.stars}</Text>
          <Text style={styles.repoElements}>Forks: {item.forks}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.packageContainer}>
      <FlatList
        data={props.allRepositories}
        keyExtractor={item => `${item.id}`}
        extraData={props}
        renderItem={renderRepoItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  packageContainer: {
    justifyContent: "center",
    flex: 1,
    borderBottomWidth: 0.5,
    margin: 5,
    padding: 5
  },
  repoContainer: {
    flexDirection: "row",
    margin: 0,
    borderBottomWidth: 0.8,
    padding: 3
  },
  package: {
    fontSize: 18
  }
});
export default DisplayRepositories;
