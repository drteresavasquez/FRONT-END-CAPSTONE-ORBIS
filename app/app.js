"use strict";
// console.log("App, yo!");

const app = angular.module("ReadtheRoom", ["ngRoute"]);

let isAuth = (authFactory) => new Promise((resolve, reject) => {
    authFactory.isAuthenticated()
        .then((userExists) => {
            if (userExists) {
                resolve();
            } else {
                reject();
            }
        });
});

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'app/user-profile-view/userProfile.html',
            controller: 'userProfileController',
            resolve: {isAuth}
        })
        .when('/login', {
            templateUrl: 'app/login-view/loginForm.html',
            controller: 'userCtrl'
        })
        .when('/edit-profile', {
            templateUrl: 'app/user-profile-view/form.html',
            controller: 'editProfileController',
            resolve: {isAuth}
        })
        .when('/exercise/:itemId', {
            templateUrl: 'app/user-profile-view/exerciseDetails.html',
            controller: 'singleExercise',
            resolve: {isAuth}
        })
        .when('/new-user', {
            templateUrl: 'app/user-profile-view/form.html',
            controller: 'addUserController',
            resolve: {isAuth}
        })
        .when('/admin/:itemId', {
            templateUrl: 'app/admin-view/exerciseScoring.html',
            controller: 'singleExercise',
            resolve: {isAuth}
        })
        .when('/admin', {
            templateUrl: 'app/admin-view/adminDashboard.html',
            controller: 'adminViews',
            resolve: {isAuth}
            })
        .otherwise('/');
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});