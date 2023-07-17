#!/bin/sh

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods@1.12.1
# have to add node yourself
brew install node@20.0.0
# link it to the path
brew link node@20.0.0

brew install yarn
yarn set version 3.5.0

yarn -v
node -v
pod --version

# Install dependencies you manage with CocoaPods.
yarn
pod install