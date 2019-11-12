# React Native [Web] + Monorepo
## 100% code sharing between Web, iOS and Android

This is the source code from [this tutorial](https://dev.to/brunolemos/tutorial-100-code-sharing-between-ios-android--web-using-react-native-web-andmonorepo-4pej).

![article-cover](https://user-images.githubusercontent.com/619186/64933790-1fc27680-d81d-11e9-8077-64a1066b7c17.png)


### How to run

_Requirements: [React Native](https://facebook.github.io/react-native/docs/getting-started.html#native) (last tested on react-native@0.61)_

  - `$ git clone git@github.com:brunolemos/react-native-web-monorepo.git`
  - `$ cd react-native-web-monorepo`
  - `$ yarn`
  - `$ cd packages/mobile/ios`
  - `$ pod install`
  - `$ cd -`
  - `$ yarn workspace web start`
  - `$ yarn workspace mobile start`
  - Run the project
    - [iOS] Via Xcode
      - `yarn xcode` (open the project on Xcode)
      - Press the Run button
    - [Android] Via Android Studio
      - `yarn studio` (open the project on Android Studio)
      - Press the Run button
    - Via CLI
      - _You may need to launch your device emulator before the next command_
      - `$ yarn android` or  `$ yarn ios`
