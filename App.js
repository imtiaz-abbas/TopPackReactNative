/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import NavBar from "./containers/NavBar.js";
import SearchContainer from "./containers/SearchContainer";
import { Platform, StyleSheet, ScrollView, Text, View } from "react-native";
import _ from "lodash";
import TopPackContainer from "./containers/TopPackContainer";

type Props = {};
export default class App extends Component<Props> {
  state = {
    currentPage: 1,
    allRepositories: []
  };
  importRepo = id => {
    if (_.includes(this.state.allRepositories, id)) {
      //TODO SHOW USER THAT THE REPOSITORY HAS ALREADY BEEN IMPORTED....
    } else {
      this.setState({ allRepositories: [...this.state.allRepositories, id] });
    }
  };
  loadSearchContainer = () => {
    this.setState({ currentPage: 1 });
  };
  loadTopPackContainer = () => {
    this.setState({ currentPage: 2 });
  };
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          loadSearchContainer={this.loadSearchContainer}
          loadTopPackContainer={this.loadTopPackContainer}
        />
        <SearchContainer
          currentPage={this.state.currentPage}
          allRepositories={this.state.allRepositories}
          importRepo={this.importRepo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  }
});
