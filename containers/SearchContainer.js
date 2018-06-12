import React, { Component } from "react";
import axios from "axios";
import {
  Platform,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import _ from "lodash";
class SearchContainer extends Component {
  state = {
    inputText: "",
    repositories: [],
    errorMessage: null
  };
  searchRepositories = async () => {
    if (this.state.inputText !== "") {
      let apiResponse = await axios.get(
        `https://api.github.com/search/repositories?q=${this.state.inputText}`
      );
      if (apiResponse.data.items.length > 0) {
        this.setState({
          repositories: apiResponse.data.items,
          errorMessage: null
        });
      } else {
        this.setState({ errorMessage: "No Repositories found." });
      }
    } else {
      this.setState({ errorMessage: "Enter a search string." });
    }
  };

  render() {
    let searchResult = null;
    if (this.state.errorMessage == null) {
      searchResult = this.state.repositories.map((entry, key) => {
        let dynamicStyle = {};
        let id = `${entry.id}`;
        if (_.includes(this.props.allRepositories, id)) {
          dynamicStyle.backgroundColor = "#99ccff";
        }
        return (
          <View key={key} style={[styles.repoContainer, dynamicStyle]}>
            <View style={{ flex: 3 }}>
              <Text style={[styles.repoElements, { fontSize: 25 }]}>
                {entry.name}
              </Text>
              <Text style={styles.repoElements}>
                Stars: {entry.stargazers_count}
              </Text>
              <Text style={styles.repoElements}>Forks: {entry.forks}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Button
                title="Import"
                onPress={() => {
                  this.props.importRepo(id);
                }}
              />
            </View>
          </View>
        );
      });
    } else {
      searchResult = <Text>{this.state.errorMessage}</Text>;
    }
    return (
      <View style={styles.searchContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 22 }}>Search</Text>
          <TextInput
            onChangeText={event => {
              this.setState({ inputText: event });
            }}
            style={{ fontSize: 19 }}
            placeholder="Search for Repositories Here"
          />
          <Button
            onPress={() => {
              this.searchRepositories();
            }}
            title="Search"
          />
          {/* <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.searchButton}>Search</Text>
            </TouchableOpacity> */}
        </View>
        <ScrollView style={styles.searchResult}>{searchResult}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchResult: {},
  searchButton: {
    margin: 20,
    width: 190,
    backgroundColor: "salmon",
    fontSize: 30
  },
  searchContainer: {
    flex: 14,
    padding: 2
  },
  repoContainer: {
    flexDirection: "row",
    margin: 0,
    borderBottomWidth: 0.8,
    padding: 3
  },
  repoElements: {
    padding: 5
  }
});
export default SearchContainer;
