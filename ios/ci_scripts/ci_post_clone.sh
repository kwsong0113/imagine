#!/bin/sh

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
# have to add node yourself
brew install node@20
# link it to the path
brew link node@20

brew install yarn
yarn set version 3.5.0

# Install dependencies you manage with CocoaPods.
yarn
pod install