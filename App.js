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
import axios from "axios";
import TopPackContainer from "./containers/TopPackContainer";

type Props = {};
export default class App extends Component<Props> {
  state = {
    topPacks: [],
    allDependencies: [],
    currentPage: 1,
    allRepositories: []
  };
  importRepo = async id => {
    if (_.includes(this.state.allRepositories, id)) {
      //TODO SHOW USER THAT THE REPOSITORY HAS ALREADY BEEN IMPORTED....
    } else {
      // this.setState({ allRepositories: [...this.state.allRepositories, id] });
      let url = "https://api.github.com/repositories/";
      url += id;
      let json = await axios.get(url);
      this.importPackages(json.data.full_name, id);
    }
  };

  importPackages = async (repoName, localId) => {
    let fileExists = false;
    let message = null;
    let allRepositories = [];
    let allDependencies = [];
    let localDependencies = [];
    if (this.state.allRepositories.indexOf(localId) !== -1) {
      message = "This repository is already imported";
      this.getPackages({
        allRepositories: this.state.allRepositories,
        allDependencies: this.state.allDependencies,
        message: message
      });
      this.setState({
        allRepositories: this.state.allRepositories,
        allDependencies: this.state.allDependencies,
        message: message
      });
    } else {
      let repoContents = await axios.get(
        `https://api.github.com/repos/${repoName}/contents`
      );
      repoContents.data.map(file => {
        if (file.name === "package.json") {
          return (fileExists = true);
        }
      });
      if (fileExists) {
        let package_json = await axios.get(
          `https://api.github.com/repos/${repoName}/contents/package.json`
        );
        let packageJsonContent = await axios.get(
          package_json.data.download_url
        );
        if ("devDependencies" in packageJsonContent.data) {
          Object.keys(packageJsonContent.data.devDependencies).map(
            dependency => {
              return localDependencies.unshift(dependency);
            }
          );
        }
        if ("dependencies" in packageJsonContent.data) {
          Object.keys(packageJsonContent.data.dependencies).map(dependency => {
            return localDependencies.unshift(dependency);
          });
        }
        allDependencies = [...localDependencies, ...this.state.allDependencies];
        message = "Success";
      } else {
        localDependencies = [];
        allDependencies = [...this.state.allDependencies];
        message = "Package.json Not Found In This Repository";
      }
      allRepositories = [...this.state.allRepositories, localId];
      this.getPackages({
        allRepositories: allRepositories,
        allDependencies: allDependencies,
        message: message
      });
      this.setState({
        allRepositories: allRepositories,
        allDependencies: allDependencies,
        message: message
      });
    }
  };
  reArrange = topPacks => {
    return _.orderBy(topPacks, ["count"], ["desc"]);
  };
  getPackages = obj => {
    let topPacks = this.calculateTopPacks(obj.allDependencies);
    let reArrangedTopPacks = this.reArrange(topPacks);
    this.setState(() => {
      return {
        allRepositories: obj.allRepositories,
        allDependencies: obj.allDependencies,
        topPacks: reArrangedTopPacks,
        errorMessage: obj.message
      };
    });
  };
  calculateTopPacks = depandencies => {
    let dependencyOccurrences = [];
    depandencies.forEach(dependency => {
      let dependencyOccurrencesUpdated = false;
      dependencyOccurrences.map(element => {
        if (element.name === dependency) {
          dependencyOccurrencesUpdated = true;
          element.count = element.count + 1;
        }
      });
      if (!dependencyOccurrencesUpdated) {
        dependencyOccurrences.push({
          name: dependency,
          count: 1
        });
      }
    });
    return dependencyOccurrences;
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
          topPacks={this.state.topPacks}
          loadSearchContainer={this.loadSearchContainer}
          loadTopPackContainer={this.loadTopPackContainer}
        />
        <SearchContainer
          topPacks={this.state.topPacks}
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
