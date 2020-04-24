'use strict';

const _ = require('lodash');
const firebase = require("firebase/app");
const trimParam = str => (typeof str === 'string' ? str.trim() : undefined);

/**
 * Load config from environment variable (if provided)
 * @param config
 * @returns {*}
 */
const checkConfig = (config) => {
    let firebaseConfig = config;

    if (strapi.config.firebaseConf) {
        if (strapi.config.firebaseConf.apiKey) {
            config.apiKey = trimParam(strapi.config.firebaseConf.apiKey);
        }
        if (strapi.config.firebaseConf.authDomain) {
            config.authDomain = trimParam(strapi.config.firebaseConf.authDomain);
        }
        if (strapi.config.firebaseConf.databaseURL) {
            config.databaseURL = trimParam(strapi.config.firebaseConf.databaseURL);
        }
        if (strapi.config.firebaseConf.storageBucket) {
            config.storageBucket = trimParam(strapi.config.firebaseConf.storageBucket);
        }
    }

    return firebaseConfig;
};


module.exports = {
    provider: 'storage',
    name: 'Firebase Storage',
    auth: {
        apiKey: {
            label: 'API key',
            type: 'text'
        },
        authDomain: {
            label: 'Auth domain name',
            type: 'text'
        },
        databaseURL: {
            label: 'App database url',
            type: 'enum',
            values: [
                'https://{authDomain}',
                'http://{authDomain}'
            ]
        },
        storageBucket: {
            label: 'Firebase Storage Bucket',
            type: 'text'
        }
    },
    init: (config) => {
        config = checkConfig(config);
        firebase.initializeApp(config);

        const storage = firebase.storage();
  
      return {
        upload: async (file) => {
          try {
            // Creating storage ref
            const storageRef = firebase.storage().ref('strapiUpload/' + file.name);

            // Upload file
            await storageRef.put(file)

          } catch (error) {
            console.log(`Upload failed, try again: ${error}`);
          }
         
        },
        delete: async (file) => {
            const deleteRef = storageRef.ref('strapiUpload/' + file.name);

            desertRef.delete()
                .then(function() {
                    console.log('deleted')
                })
                .catch(function(error) {
                    console.log(error)
                });
        }
      };
    }
  };