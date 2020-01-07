import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


class AutocompleteExample extends Component {
  static renderFilm({id, title}) {
      console.log("Title: ", title)
    return (
      <View styley={{ backgroundColor: 'white', elevation: 5, padding: 15   }}>
        <Text style={styles.idText}>ID: {id}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [
        {
            id: 'sdfsd545sd64fsd4f6',
            title: 'Har pal geo'
        },
        {
            id: 'sdfsd545sd6Sdf2s4df',
            title: 'Zindage na milay gi dobara'
        },
        {
            id: 'sdfsd5454s4dFsd4FS',
            title: 'Dil wale dulhaniye le jayen gay'
        },
        {
            id: 'sdfsd545sd45sdf45sdf',
            title: 'Aye dil hai mushkil'
        },
        {
            id: 'sdfsd545sd4f5d4f5d4f5df',
            title: 'Bahubali'
        },
        {
            id: 'sd45s4d5sd45sd',
            title: 'Dangal'
        },
    ],
      query: ''
    };
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Star Wars film title"
          renderItem={(item) => 
          {
              console.log("Item: ", item)
          return (
            <TouchableOpacity onPress={() => this.setState({ query: item.item.title })}>
              <Text style={styles.itemText}>
                {item.item.title} 
              </Text>
            </TouchableOpacity>
          )
        }
        }
        />
        <View style={styles.descriptionContainer}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2,
    color: 'black'
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: 'transparent',
    height:600
  },
  infoText: {
    textAlign: 'center'
  },
  idText: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 25,
    marginBottom: 5,
    textAlign: 'left'
  },
  titleText: {
    fontSize: 18,
    marginLeft: 25,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'left'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default AutocompleteExample;