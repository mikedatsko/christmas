import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  SafeAreaView,
  Easing,
  TouchableOpacity,
  Image,
  ImageBackground,
  Share,
  AsyncStorage
} from 'react-native';
import Snow from 'react-native-snow';
import { PaymentRequest } from 'react-native-payments';
import Sound from 'react-native-sound';
import bg from './assets/images/bg.jpg';
import snow from './assets/images/snow.png';
import slogan from './assets/images/slogan.png';
import chest from './assets/images/chest.png';
import btnOpen from './assets/images/btn-open.png';
import btnShare from './assets/images/btn-share.png';
import btnBack from './assets/images/btn-back.png';
import bgScroll from './assets/images/bg-scroll.png';
import bgRainbow from './assets/images/bg-rainbow.png';
import star from './assets/images/star.png';
import { WishList, WishIndexList } from './WishList';

const { width, height } = Dimensions.get('window');
const snowHeight = width * 150 / 300;
const sloganHeight = width * 250 / 500;
const scrollHeight = (width - 80) * 290 / 310;

type Props = {
  snowflakesStyle: { color: 'white' },
  snowfall: 'medium',
};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      animRainbowSpin: new Animated.Value(0),
      animChestScaleTo: new Animated.Value(1),
      animChestScaleBack: new Animated.Value(1),
      animStarSpin: new Animated.Value(0),
      animStar1Scale: new Animated.Value(0),
      animStar2Scale: new Animated.Value(0),
      animStar3Scale: new Animated.Value(0),
      isPaid: false,
      wish: 0,
      wishList: [],
      wishListFiltered: WishIndexList,
    };

    this.getWish();
  }

  componentWillMount(): void {
    this.setState({
      isPaid: false,
      wish: 0,
    });
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(
        this.state.animRainbowSpin,
        {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
    ).start();

    Animated.loop(
      Animated.timing(
        this.state.animStarSpin,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            this.state.animChestScaleTo,
            {
              toValue: 1.05,
              duration: 600,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          Animated.timing(
            this.state.animChestScaleBack,
            {
              toValue: 1.05,
              duration: 600,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
        ]),
        Animated.parallel([
          Animated.timing(
            this.state.animChestScaleTo,
            {
              toValue: 1,
              duration: 600,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          Animated.timing(
            this.state.animChestScaleBack,
            {
              toValue: 1,
              duration: 600,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
        ])
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.animStar1Scale,
          {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar1Scale,
          {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar1Scale,
          {
            toValue: 0,
            delay: 1000,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.animStar2Scale,
          {
            toValue: 1,
            delay: 1000,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar2Scale,
          {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar2Scale,
          {
            toValue: 0,
            delay: 800,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          this.state.animStar3Scale,
          {
            toValue: 1,
            delay: 2000,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar3Scale,
          {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        Animated.timing(
          this.state.animStar3Scale,
          {
            toValue: 0,
            delay: 900,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
      ])
    ).start();

    const bgSound = new Sound(require('./assets/audio/wish-you-a-merry-christmas.mp3'), (error) => {
      if (error) {
        return;
      }

      bgSound.setNumberOfLoops(-1);
      bgSound.play((success) => {
        if (success) {

        } else {

        }
      });
    });
  }

  pay() {
    const wishIndex = this.state.wishListFiltered[this.getRandomNumber(0, this.state.wishListFiltered.length - 1)];
    this.setWish(wishIndex);
    // const METHOD_DATA = [{
    //   supportedMethods: ['apple-pay'],
    //   data: {
    //     merchantIdentifier: 'merchant.christmaswishes',
    //     supportedNetworks: ['visa', 'mastercard', 'amex'],
    //     countryCode: 'US',
    //     currencyCode: 'USD'
    //   }
    // }];
    //
    // // console.log('wishList', this.state.wishList, this.state.wishListFiltered);
    //
    // const DETAILS = {
    //   id: 'christmaswish',
    //   displayItems: [
    //     {
    //       label: 'Christmas Wish',
    //       amount: { currency: 'USD', value: '0.99' }
    //     }
    //   ],
    //   total: {
    //     label: 'Internet Technologies',
    //     amount: { currency: 'USD', value: '0.99' }
    //   }
    // };
    //
    // const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
    //
    // paymentRequest.show()
    //   .then(paymentResponse => {
    //     console.log('response', paymentResponse);
    //     const wishIndex = this.state.wishListFiltered[this.getRandomNumber(0, this.state.wishListFiltered.length - 1)];
    //     this.setWish(wishIndex);
    //
    //     paymentResponse.complete('success');
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //     this.setState({
    //       isPaid: false
    //     });
    //   });
  }

  async getWish() {
    try {
      // await AsyncStorage.setItem('wishList', '');
      // await AsyncStorage.setItem('wish', '');
      const wish = await AsyncStorage.getItem('wish');
      const wishList = await AsyncStorage.getItem('wishList');
      const wishListParsed = wishList.split(',').map(Number);
      this.setState({
        wish: parseInt(wish, 10),
        wishList: wishListParsed,
        wishListFiltered: WishIndexList.filter(wIndex => !wishListParsed.includes(wIndex)),
      });
    } catch (error) {
      this.setState({wish: 0});
    }
  }

  async setWish(wish) {
    const wishList = [...this.state.wishList, wish];
    const wishListFiltered = WishIndexList.filter(wIndex => !wishList.includes(wIndex));

    try {
      await AsyncStorage.setItem('wishList', wishList.join(','));
      await AsyncStorage.setItem('wish', wish.toString());
      this.setState({
        wish: wish,
        wishList: !wishListFiltered.length ? [] : wishList,
        wishListFiltered: !wishListFiltered.length ? WishIndexList : wishListFiltered,
        isPaid: true
      });

      // console.log('wishList', wishList, wishListFiltered, wish);
    } catch (error) {
      // Error saving data
      this.setState({
        isPaid: true
      });
    }
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  share() {
    const options = {
      title: 'Christmas Wishes',
      message: `Christmas Wish: ${WishList[this.state.wish]}`,
      url: 'https://itunes.apple.com/us/app/christmaswishes/id1447444769'
    };

    Share.share(options)
      .then((res) => {

      })
      .catch((err) => {

      });
  }

  render() {
    const {
      animRainbowSpin,
      animChestScaleTo,
      animChestScaleBack,
      animStar1Scale,
      animStar2Scale,
      animStar3Scale,
      animStarSpin,
      isPaid,
      wish
    } = this.state;

    const spin = animRainbowSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const spinStar = animStarSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: height,
        }}
      >
        <Image
          style={{
            position: 'absolute',
            top: 0,
            height: height,
          }}
          source={bg}
          blurRadius={8}
        />

        <Image
          source={snow}
          style={{
            width: width,
            height: snowHeight,
            position: 'absolute',
            bottom: -38,
          }}
          imageStyle={{
            resizeMode: 'contain',
          }}
        />

        <Image source={slogan} style={{
          width: width,
          height: sloganHeight,
          top: 0,
          left: 0,
          position: 'absolute'
        }}/>

        {isPaid
          ? <Animated.View style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ImageBackground source={bgScroll} style={{
              width: width - 80,
              height: scrollHeight,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: '#995700',
                fontSize: 20,
                textAlign: 'center',
                paddingBottom: 10,
                paddingLeft: 70,
                paddingRight: 70,
                fontFamily: 'Bradley Hand'
              }}>
                {WishList[wish]}
              </Text>
            </ImageBackground>

            <TouchableOpacity onPress={() => this.share()} style={{position: 'absolute', bottom: '14%'}}>
              <Image source={btnShare} style={{width: 250, height: 118}}/>

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  top: 5,
                  left: 12,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar1Scale}, {scaleY: animStar1Scale}]
                }}
                resizeMode={'contain'}
              />

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  top: -2,
                  left: 180,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar2Scale}, {scaleY: animStar2Scale}]
                }}
                resizeMode={'contain'}
              />

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  top: 64,
                  left: 120,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar3Scale}, {scaleY: animStar3Scale}]
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({isPaid: false})} style={{position: 'absolute', bottom: '2%'}}>
              <Image source={btnBack} style={{width: 200, height: 101}}/>
            </TouchableOpacity>
          </Animated.View>

          : <View style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Animated.Image
              style={{
                transform: [{rotate: spin}]
              }}
              imageStyle={{
                position: 'absolute',
                bottom: '40%',
              }}
              source={bgRainbow}
            />

            <Animated.Image
              source={chest}
              style={{
                width: 300,
                height: 255,
                bottom: '30%',
                position: 'absolute',
                transform: [{scaleX: animChestScaleTo}, {scaleY: animChestScaleBack}]
              }}
              resizeMode={'contain'}
            />

            <View
              style={{
                width: 250,
                bottom: '12%',
                position: 'absolute'
              }}
            >
              <TouchableOpacity onPress={() => this.pay()}>
                <Image source={btnOpen} style={{width: 250, height: 118}}/>
              </TouchableOpacity>

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  bottom: 74,
                  marginLeft: 15,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar1Scale}, {scaleY: animStar1Scale}]
                }}
                resizeMode={'contain'}
              />

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  bottom: 30,
                  marginLeft: 200,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar2Scale}, {scaleY: animStar2Scale}]
                }}
                resizeMode={'contain'}
              />

              <Animated.Image
                source={star}
                style={{
                  width: 40,
                  height: 40,
                  bottom: 12,
                  marginLeft: 50,
                  position: 'absolute',
                  transform: [{rotate: spinStar}, {scaleX: animStar3Scale}, {scaleY: animStar3Scale}]
                }}
                resizeMode={'contain'}
              />
            </View>
          </View>
        }

        <Snow snowfall="medium"/>
      </SafeAreaView>
    );
  }
}
