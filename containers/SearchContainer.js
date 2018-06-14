import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  ToastAndroid,
  Image
} from "react-native";
import axios from "axios";
class SearchContainer extends Component {
  state = {
    inputText: "",
    repositories: [],
    loading: false
  };
  searchRepositories = async () => {
    if (this.state.inputText !== "") {
      this.setState({ loading: true });
      let apiResponse = await axios.get(
        `https://api.github.com/search/repositories?q=${
          this.state.inputText
        }&page=1&per_page=100`
      );
      if (apiResponse.data.items.length > 0) {
        let structuredData = [];
        apiResponse.data.items.map(item => {
          let dataObject = {
            name: item.name,
            id: item.id,
            stars: item.stargazers_count,
            forks: item.forks
          };
          structuredData.push(dataObject);
        });

        this.setState({
          loading: false,
          repositories: structuredData
        });
      } else {
        ToastAndroid.show("No repositories found related to the search", 0.5);
        this.setState({
          loading: false
        });
      }
    } else {
      ToastAndroid.show("Enter a search String", 0.5);
    }
  };
  renderRepoItem = ({ item }) => {
    let dynamicStyle = {};
    let id = `${item.id}`;
    let alreadyExists = false;
    if (_.includes(this.props.allRepositories.ids, id)) {
      dynamicStyle.backgroundColor = "#99ccff";
      alreadyExists = true;
    }
    return (
      <View key={id} style={[styles.repoContainer, dynamicStyle]}>
        <View style={{ flex: 3 }}>
          <Text style={[styles.repoElements, { fontSize: 25 }]}>
            {item.name}
          </Text>
          <Text style={styles.repoElements}>Stars: {item.stars}</Text>
          <Text style={styles.repoElements}>Forks: {item.forks}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            title="Import"
            onPress={() => {
              this.props.importRepo(id, item);
            }}
            disabled={alreadyExists}
          />
        </View>
      </View>
    );
  };
  render() {
    let loading = null;
    if (this.state.loading) {
      loading = (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("./img.gif")}
            style={{ height: 60, width: 60 }}
            resizeMode="contain"
          />
        </View>
      );
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
        </View>
        {loading}
        <FlatList
          data={this.state.repositories}
          keyExtractor={item => `${item.id}`}
          extraData={this.props}
          renderItem={this.renderRepoItem}
        />
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
