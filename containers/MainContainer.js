import React, { Component } from "react";
import SearchContainer from "./SearchContainer";
import TopPackContainer from "./TopPackContainer";
import DisplayRepositories from "./DisplayRepositories";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
class MainContainer extends Component {
  state = {
    allRepositories: {
      ids: [],
      data: []
    }
  };
  componentDidMount = async () => {
    try {
      let item = await AsyncStorage.getItem("storageObject");
      item = JSON.parse(item);
      if (item) {
        this.setState({
          allRepositories: item.allRepositories
        });
      }
    } catch (e) {}
  };
  render() {
    if (this.props.currentPage === 1) {
      return (
        <SearchContainer
          allRepositories={this.state.allRepositories}
          importRepo={this.props.importRepo}
        />
      );
    } else if (this.props.currentPage === 3 && this.props.topPacks.length > 0) {
      return <TopPackContainer topPacks={this.props.topPacks} />;
    } else if (this.props.currentPage === 3) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No TopPacks yet.</Text>
        </View>
      );
    } else if (
      this.props.currentPage === 2 &&
      this.props.allRepositories.ids.length > 0
    ) {
      return (
        <DisplayRepositories
          allRepositories={this.props.allRepositories.data}
        />
      );
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No Repositories yet.</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
export default MainContainer;
