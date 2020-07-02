# Welcome to BIP Mobile

This is a web app for tracking beer pong games on your phone with your friends when playing games online via Zoom, Facetime, or whatever your preferred video chat app is!

## Instructions For Users

Before you can play you'll need the Expo app on you phone. You can get it here:
[iPhone Users](https://apps.apple.com/us/app/expo-client/id982107779)
[Android Users](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)

Once you have the Expo app downloaded go [here](https://expo.io/@mblumberg93/bip-mobile) and scan the QR code with your phone.

Now here are directions on how to play:

### Step 1 - Create A Game

First, both players will need to open the BIP Mobile App via the Expo App on your phones. When the app loads, one of you enters your Team Name in the specified box and clicks "Create" to generate a unique game code. After you generate the code, copy it and send it to your opponent.

### Step 2 - Join A Game

Your opponent (or whichever player did not create the game code) starts off by entering their Team Name. Then when that player receives the code from the creator, they paste it into the box labeled "Game Code" and click "Join Game". After doing that, you should both be directed to a screen labeled "Choose Start" which will show your name as well as your opponent's name.

### Step 3 - Decide Who Starts

When you have decided who should start, one of you click the appropriate button and the game begins. The starting player will be directed to a screen where they can interact with their "rack" and the waiting player will just see their opponent's rack.

### Step 4 - Taking Turns

When you make cups in the real world, tap cups on the screen to mark them as "inactive". When cups are inactive they will turn into empty circles. You can tap them again to make them "active" in the event you clicked the wrong cup. When your turn is done click "End Turn" and it will be your opponents turn.

### Step 5 - Reracking

During your turn you have the ability to "rerack". To do this, tap the "Rerack" button and you will be directed to a rerack screen with options based on the cups you have active currently. When you select an option and click "Rerack", both the formation on your side of the table and your opponent's side of the table will change to the selected rack. Note, reracking resets any inactive cups.

### Step 6 - New Round

When you've finished a game and you'd like to play another round, click the "Reset Game" button and your racks will return to the standard formation.

### Step 7 - End the Game

When you'd like to stop playing with your current opponent simply click "Quit Game" at the bottom.

## For Developers

Feel free to clone this repository and play with it if you like. There are just a few things you'll need to know before you can actually get to work.

In order to develop this app you will need a [Firebase](https://firebase.google.com/) account. Once you have an account you'll need to get some config for your app. You'll need to add a project in Firebase much like in the directions [here](https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/#setting-up). Once you have that config, you'll create a file called **secrets.js** and place that in the main project directory. In that file you will have this:

    export const FIREBASE_CONFIG = {
        apiKey: "...",
        authDomain: "...",
        databaseURL: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "...",
        measurementId: "..."
    };
where the ".." values are copied from the project config in Firebase.

To test the app out locally, all you need to do is run

    npm start
in the main project directory. That will open up the Expo console in a new tab. From there you can test out the app in a browser, in a simulator, or even on a phone (if you download the Expo app).

If you'd like to deploy your app to Github Pages it's real simple. Just follow the directions [here](https://github.com/gitname/react-gh-pages#deploying-a-react-app-to-github-pages). You'll need to update some config to get it to work. Keep in mind that since it's a React Native app some features will not work in the browser. It might be better to publish your app to Expo (see below).

You can also publish to [Expo](https://expo.io/) so that others can use the app, but you'll need an account first. See the instructions [here](https://docs.expo.io/workflow/publishing/)  on publishing.
