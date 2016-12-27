React-Native-App-Follow-Me
===
This application will help keep the car team traveling
## Requirements
* [Nodejs 7.1.0+](https://nodejs.org/en/)
* [NPM 3.10.9+](https://www.npmjs.com/)
* [React Native 0.39+](https://facebook.github.io/react-native/docs/getting-started.html)
* `Android SDK Build-Tools 23.0.3+`

## Dependencies
* [react-native-maps](https://github.com/airbnb/react-native-maps)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Development
### General requirements before running project
>1. `$ npm install` install all dependencies
>2. `$ npm run link` link with android libraries

### Start with server
>1. Open an emulator(Android Studio/AVD Manager)
>2. `$ npm start`

### Running the Mobile Apps

#### Android
>1. [Offical document](http://facebook.github.io/react-native/docs/getting-started.html)
>2. Modify your google map api key in `./android/app/src/main/AndroidManifest.xml`
```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY"/>
```
>3. `$ npm run dev-andriod`
>4. on emulator then press `ctrl + m` can use reload、live reload、hot reload、remote debug

#### iOS
Pending...

## Resources ##
* google place search： [geocoding](https://developers.google.com/maps/documentation/geocoding/intro?hl=zh-tw#JSON)

## Troubleshooting ##
>1.   Unknown source file : UNEXPECTED TOP-LEVEL EXCEPTION:
```
$  cd android/ && ./gradlew clean && cd .. && react-native run-android
```
>2. Emulator's location can see [here](http://www.jesusamieiro.com/android-studio-simulate-multiple-gps-points-with-mock-location-plugin/)
