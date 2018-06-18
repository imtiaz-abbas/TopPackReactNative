/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import NavBar from "./containers/NavBar.js";
import MainContainer from "./containers/MainContainer";
import {
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import _ from "lodash";
import axios from "axios";
import TopPackContainer from "./containers/TopPackContainer";

type Props = {};
export default class App extends Component<Props> {
  state = {
    topPacks: [],
    allDependencies: [],
    currentPage: 1,
    allRepositories: { ids: [], data: [] }
  };
  componentDidMount = async () => {
    try {
      let item = await AsyncStorage.getItem("storageObject");
      item = JSON.parse(item);
      if (item) {
        this.setState({
          allDependencies: item.allDependencies,
          allRepositories: item.allRepositories,
          topPacks: item.topPacks
        });
      }
    } catch (e) {}
  };
  importRepo = async (id, item) => {
    if (_.includes(this.state.allRepositories.ids, id)) {
      //TODO SHOW USER THAT THE REPOSITORY HAS ALREADY BEEN IMPORTED....
    } else {
      let url = "https://api.github.com/repositories/";
      url += id;
      try {
        let json = await axios.get(url);
        this.importPackages(json.data.full_name, id, item);
      } catch (e) {
        ToastAndroid.show("API rate limit exceeded.", 0.5);
      }
    }
  };

  importPackages = async (repoName, localId, item) => {
    let fileExists = false;
    let allRepositories = {
      ids: [],
      data: [...this.state.allRepositories.data]
    };
    let allDependencies = [];
    let localDependencies = [];
    if (
      this.state.allRepositories.ids.length > 0 &&
      this.state.allRepositories.ids.indexOf(localId) !== -1
    ) {
      this.getPackages({
        allRepositories: {
          ids: this.state.allRepositories.ids,
          data: this.state.allRepositories.data
        },
        allDependencies: this.state.allDependencies
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
      } else {
        localDependencies = [];
        allDependencies = [...this.state.allDependencies];
        ToastAndroid.show(
          "No Package.json file was found in this repository",
          0.5
        );
      }
      allRepositories.ids = [...this.state.allRepositories.ids, localId];
      allRepositories.data = [...this.state.allRepositories.data, item];
      this.getPackages({
        allRepositories: allRepositories,
        allDependencies: allDependencies
      });
    }
  };
  reArrange = topPacks => {
    return _.orderBy(topPacks, ["count"], ["desc"]);
  };
  getPackages = obj => {
    let topPacks = this.calculateTopPacks(obj.allDependencies);
    let reArrangedTopPacks = this.reArrange(topPacks);
    let syncObject = {
      allRepositories: obj.allRepositories,
      allDependencies: obj.allDependencies,
      topPacks: reArrangedTopPacks
    };
    try {
      AsyncStorage.setItem("storageObject", JSON.stringify(syncObject));
    } catch (error) {
      ToastAndroid.show(error, 0.5);
    }
    this.setState(() => {
      return {
        allRepositories: obj.allRepositories,
        allDependencies: obj.allDependencies,
        topPacks: reArrangedTopPacks
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
  loadRepositoriesContainer = () => {
    this.setState({ currentPage: 2 });
  };
  loadTopPackContainer = () => {
    this.setState({ currentPage: 3 });
  };
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          topPacks={this.state.topPacks}
          loadSearchContainer={this.loadSearchContainer}
          loadTopPackContainer={this.loadTopPackContainer}
          loadRepositoriesContainer={this.loadRepositoriesContainer}
        />
        <MainContainer
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
