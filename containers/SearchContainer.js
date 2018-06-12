import React, { Component } from "react";
import {
  Platform,
  TextInput,
  StyleSheet,
  Button,
  Text,
  View
} from "react-native";

class SearchContainer extends Component {
  state = {
    inputText: ""
  };
  render() {
    return (
      <View style={styles.searchContainer}>
        <Text style={{ fontSize: 22 }}>Search</Text>
        <TextInput
          onChangeText={event => {
            this.setState({ inputText: event });
          }}
          style={{ fontSize: 19 }}
          placeholder="Search for Repositories Here"
        />
        <Button onPress={() => {}} title="Search" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 12
  }
});
export default SearchContainer;
