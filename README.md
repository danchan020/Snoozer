# Snoozer

<img src="/assets/snoozer-logo.png" width=350 height=350/>

A React Native mobile app for adjusting the user's sleep pattern.

Link to backend: https://github.com/danchan020/snoozer-backend-rails

# Overview

-Users are able to set a starting alarm time and an ending alarm time.

-Based on the user-configured increments, the alarm will trigger earlier each day.

-For example: Daniel set the alarm to start at 8:00 and the end goal is 7:00. The increments are set to 5 mins per day.
Daniel will wake up at 8:00 the next day, and he will wake up 7:55 the day after that. The time will subtract until it reaches 7:00.

# GIFs

**To get started:**

Make sure you have either xCode on Mac installed or Expo Go app installed on iPhone or Android device.

```
// clone both the front and back end repositories

git clone git@github.com:danchan020/snoozer.git (frontend)
git clone git@github.com:danchan020/snoozer-backend-rails.git (backend)
```

```
// install expo cli
npm i -g expo-cli
```

```
// start the client and server

npm start (frontend)
rails s (backend)
```
