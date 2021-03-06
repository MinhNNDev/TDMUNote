import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Svg, Line} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import textData from '../assets/datatext';
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const screenWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('window');

export default class FacultyNote extends Component {
  constructor(props) {
    super(props);
    const {item} = props;

    this.state = {
      cont: {...item},
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const {item} = this.props.navigation.state.params;
    fetch(`http://tdmuapp.ngocminh.design/api.php?${item.idcode}`)
      .then(response => response.json())
      .then(response => {
        this.setState({cont: response});
      })
      .catch(err => {
        console.log(err);
      });
  };

  goToCategoryScreen = key => {
    this.props.navigation.navigate('CategoryScreen', {key});
  };

  renderData = () => {
    return Object.values(textData).map((data, index) => (
      <TouchableOpacity
        key={data.key}
        style={index % 2 == 0 ? styles.tbBox1 : styles.tbBox2}
        onPress={() => this.goToCategoryScreen(data.key)}>
        <Image source={data.image} style={styles.imgst} />
        <Text style={styles.cstxt}>{data.name}</Text>
      </TouchableOpacity>
    ));
  };

  render() {
    const numColumns = 2;
    const {item} = this.props.navigation.state.params;
    const {cont} = this.state;
    var datacontent = entities.decode(cont.content);
    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <HeaderComponent
          title="Sổ tay khoa"
          backBtn={true}
          goBack={() => this.props.navigation.goBack()}
        />
        <View style={styles.viewcover}>
          <Image
            source={{uri: `https://ngocminh.design/imageapp/${item.image}`}}
            style={styles.imgcover}
          />
          <Text
            style={{
              position: 'absolute',
              fontFamily: 'Roboto-Bold',
              fontSize: 22,
              color: '#fff',
            }}>
            {item.faculty_name}
          </Text>
        </View>
        <View style={styles.viewTable}>
          {/* <View style={styles.itemContainer}>{this.renderData()}</View> */}
          <View style={styles.lineCol} />
          <View style={[styles.lineRow, styles.lineRowAbove]} />
          <View style={[styles.lineRow, styles.lineRowBelow]} />
          <FlatList
            style={{}}
            data={cont}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CategoryScreen', {item})
                    }>
                    <View>
                      <View style={styles.tbBox}>
                        <FontAwesome5
                          style={styles.imgst}
                          name={item.image}
                          size={37}
                          color="rgba(19,146,253,1)"
                        />
                        <Text style={styles.cstxt}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 7,
              position: 'absolute',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tbBox: {
    width: screenWidth / 2 - 30,
    height: 132,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff9',
  },
  cstxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  imgst: {
    marginBottom: 5,
  },
  imgcover: {
    width: '97%',
    height: 180,
    borderRadius: 5,
    resizeMode: 'cover',
    overlayColor: '#000',
    opacity: 0.4,
  },
  viewcover: {
    width: 400,
    height: 180,
    backgroundColor: '#000', //#1392fd
    overlayColor: '#fff',
    marginTop: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth,
    marginVertical: 8,
    marginHorizontal: 15,
  },
  viewTable: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
  lineCol: {
    position: 'absolute',
    width: 1,
    height: 396,
    backgroundColor: '#000',
    justifyContent: 'center',
    marginHorizontal: screenWidth / 2.37,
  },
  lineRow: {
    position: 'absolute',
    width: 332,
    height: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  lineRowAbove: {marginTop: 131},
  lineRowBelow: {marginTop: 263},
});
