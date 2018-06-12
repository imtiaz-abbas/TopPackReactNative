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
      this.setState({
        repositories: apiResponse.data.items,
        errorMessage: null
      });
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
          dynamicStyle.backgroundColor = "salmon";
        }
        return (
          <View key={key} style={[styles.repoContainer, dynamicStyle]}>
            <Text style={styles.repoElements}>{entry.name}</Text>
            <Text style={styles.repoElements}>
              Stars: {entry.stargazers_count}
            </Text>
            <Text style={styles.repoElements}>Forks: {entry.forks}</Text>
            <Button
              title="Import"
              onPress={() => {
                this.props.importRepo(id);
              }}
            />
          </View>
        );
      });
    }
    return (
      <View style={styles.searchContainer}>
        <View>
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
    padding: 12
  },
  repoContainer: {
    margin: 0,
    padding: 5,
    borderWidth: 0.5
  },
  repoElements: {
    padding: 5
  }
});
export default SearchContainer;
