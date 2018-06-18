import React, { Component } from "react";
import { Text, View, StyleSheet, AsyncStorage, FlatList } from "react-native";
class DisplayRepositories extends Component {
  state = {
    asyncObj: null
  };
  componentDidMount = async () => {
    let item = await AsyncStorage.getItem("storageObject");
    item = JSON.parse(item);
    if (item) {
      this.setState({
        asyncObj: item
      });
    }
  };
  renderRepoItem = ({ item }) => {
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
  render() {
    if (this.state.asyncObj) {
      return (
        <View style={styles.packageContainer}>
          <FlatList
            data={this.state.asyncObj.allRepositories.data}
            keyExtractor={item => `${item.id}`}
            extraData={this.props}
            renderItem={this.renderRepoItem}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Nothing is being returned.</Text>
        </View>
      );
    }
  }
}
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
