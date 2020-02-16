import React from "react";
import axios from "axios";
import { ActivityIndicator, Text, View } from "react-native";

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, books: [] };
  }

  componentDidMount() {
    async function apiLoader() {
      try {
        let response = await fetch("http://localhost:4000/books");
        let responseJson = await response.json();
        // return responseJson;
        this.setState(
          {
            isLoading: false,
            books: this.responseJson
          },
          function() {}
        );
      } catch (error) {
        console.error(error);
      }
    }
    apiLoader();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let booksMap = this.state.books.map((val, key) => {
        <Text key={key}>{val.title}</Text>;
      });
      return <View>{booksMap}</View>;
    }
  }
}
