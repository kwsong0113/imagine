[App Store]: https://apple.co/458U0ul
[React Native]: https://github.com/facebook/react-native
[TypeScript]: https://github.com/microsoft/TypeScript
[Firebase]: https://github.com/invertase/react-native-firebase
[CodePush]: https://github.com/microsoft/react-native-code-push
[React Navigation]: https://github.com/react-navigation/react-navigation
[i18next]: https://github.com/i18next/react-i18next
[NativeBase]: https://github.com/GeekyAnts/NativeBase
[Redux Persist]: https://github.com/rt2zz/redux-persist
[Async Storage]: https://github.com/react-native-async-storage/async-storage
[Redux Toolkit]: https://github.com/reduxjs/redux-toolkit
[Reanimated]: https://github.com/software-mansion/react-native-reanimated
[React Native Gesture Handler]: https://github.com/software-mansion/react-native-gesture-handler
[React Native Skia]: https://github.com/Shopify/react-native-skia
[$Q Recognizer]: https://depts.washington.edu/acelab/proj/dollar/qdollar.html


<div align="center">
   <a href="https://apple.co/458U0ul">
     <img src="https://leafy-wisp-bfecb8.netlify.app/images/screenshot/github_preview.png" alt="Linky">
   </a>
    <h3>Linky</h3>
</div>
<p align="center">
  <em>
    Gesture-based app launcher for iOS: Open apps & shortcuts quickly
    <br/><br/>
    <b>10k views, 1k downloads on the App Store!</b>
  </em>
</p>
<p align="center">
  <a href="https://github.com/search?q=repo%3Akwsong0113%2Fimagine++language%3ATypeScript&type=code" target="_blank">
    <img src="https://img.shields.io/github/languages/top/kwsong0113/imagine" alt="Language">
  </a>
  <a href="https://apple.co/458U0ul" target="_blank">
    <img src="https://img.shields.io/itunes/v/6449445087?logo=Apple&label=App%20Store" alt="App store">
  </a>
   <img src="https://img.shields.io/badge/iOS-12.4+-blue?logo=Apple" alt="MIT license">
  <a href="https://github.com/kwsong0113/imagine/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT license">
  </a>
</p>

## About
Linky is an open-source iOS app that empowers iPhone users to perform a multitude of tasks—such as opening apps, shortcuts, and URL schemes—by simply drawing a single gesture on a lock screen widget. With support for both English and Korean, Linky has over 500+ active users globally, having gained 10k views and 1k downloads on the [App Store].
<br/><br/>
The app is compatible with iOS 12.4 and above (iOS 16.0+ for the lock screen widget).

<a href="https://apps.apple.com/us/app/linky-quick-app-launcher/id6449445087?itsct=apps_box_badge&amp;itscg=30200">
  <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1684800000" alt="Download on the App Store" height="60px">
</a>

## Features
- **App**: Perform actions on Apple-made apps, settings, and third-party apps by simply drawing gestures.
  - Can do various tasks like making calls or payments with a single intuitive gesture.
  - ~100 apps supported
- **Apple Shortcut**: Execute frequently used shortcuts with gestures
- **Custom URL Scheme Support**: Linky extends support to custom URL Schemes, enabling interaction with unregistered apps.
- **Statistics**: Review launched app records through Linky, gaining valuable insights into app interactions.

## Preview

https://github.com/kwsong0113/imagine/assets/53707540/d6675ad0-7f54-4fb3-af03-2822f045ecc4


## Getting Started
### Installation
Open a Terminal in the project root and run...

Install all dependencies:
```shell
yarn install
```
Install all pods:
``` shell
cd ios && pod install
```
### Running on Simulator
```shell
yarn ios
```

## Built With
Linky iOS is built using [React Native] and [TypeScript].

### User Interface
- [NativeBase] - UI library
- [Reanimated] & [React Native Gesture Handler] - For building interactive UIs
### Features
- [React Native Skia] - Drawing a gesture on canvas
- **[$Q Recognizer]** - **Gesture recognition**
- [Redux Toolkit] & [Redux Persist] & [Async Storage] - Managing application state, data and storage
- [i18next] - Internalization

### Analytics
- [Firebase] - Data analysis & Screen tracking (with [React Navigation])

### DevOps
Linky utilizes both App Store releases and CodePush for streamlined deployment.
- Xcode Cloud - Continuous deployment to the App Store
- [CodePush] - For Deploying updates directly to users

## License
Linky is licensed under the terms of the MIT license.
