// ################################################################################
// Data service operations setup

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Load the schemas...
const termsEnglishSchema = require('./msc_termsEnglish.js');
const termsNonEnglishSchema = require('./msc_termsNonEnglish.js');
const definitionsSchema = require('./msc_definitions.js');
// Data entities; the standard format is:

module.exports = function() {
    let englishTerms;
    let nonEnglishTerms;
    let englishDefs;

    return {
        connect: function () {
            return new Promise(function (resolve, reject) {
      
              // Create connection to the database
              console.log('Attempting to connect to the database...');
      
              // The following works for localhost...
              // Replace the database name with your own value
              mongoose.connect('mongodb+srv://dbUser1:MrMarvinDog2020@cluster0-20mtj.mongodb.net/App2-DB?retryWrites=true&w=majority', { connectTimeoutMS: 5000, useUnifiedTopology: true });
      
              // This one works for MongoDB Atlas...
              // (to be provided)
              //mongoose.connect('mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority', { connectTimeoutMS: 5000, useUnifiedTopology: true });
      
              // From https://mongoosejs.com/docs/connections.html
              // Mongoose creates a default connection when you call mongoose.connect(). 
              // You can access the default connection using mongoose.connection.
              var db = mongoose.connection;
      
              // Handle connection events...
              // https://mongoosejs.com/docs/connections.html#connection-events
              // The data type of a connection event is string
              // And more than one connection event may be emitted during execution
      
              // FYI the Node.js EventEmitter class docs is here...
              // https://nodejs.org/api/events.html#events_class_eventemitter
      
              // Handle the unable to connect scenario
              // "on" is a Node.js method in the EventEmitter class
              // https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
              db.on('error', (error) => {
                console.log('Connection error:', error.message);
                reject(error);
              });
      
              // Handle the open/connected event scenario
              // "once" is a Node.js method in the EventEmitter class
              // https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
              db.once('open', () => {
                console.log('Connection to the database was successful');
                englishTerms= db.model("termsEnglish", termsEnglishSchema, "termsEnglish");
                nonEnglishTerms = db.model("termsNonEnglish", termsNonEnglishSchema, "termsNonEnglish");
                englishDefs = db.model("englishDefs", definitionsSchema, "definitions");
                resolve();
              });
            });
          },

        //*********** English Terms *************//
          //Get All
          termsEnglishGetAll: function(){
            return new Promise((resolve, reject) =>{
                englishTerms.find()
                .sort({wordEnglish: 'asc'})
                .exec((error, items) => {
                    if (error) {
                      // Query error
                      return reject(error.message);
                    }
                    // Found, a collection will be returned
                    return resolve(items);
                  });
            });
                 
        },

        //Get One
        termsEnglishGetById: function(termId){
            return new Promise((resolve, reject) =>{
               englishTerms.findById(termId, (err, item) => {
                    if (err) {
                        return reject(err.message);
                    }
                    if (item) { 
                        return resolve(item);
                    } else {
                        return reject ("Not found");
                    }
                })
            });
            
        },

        //Get some or all
        getFromTermEnglish: async function(text){
              // Decode the incoming value
                 text = decodeURIComponent(text);

              //Find the text passed in field
              let results = await englishTerms.find({ "wordEnglish": { "$regex": text, "$options": "i" } });
              results.exec((error, term) => {
                 if (error)
                    return reject(error.message);
                 else if (term)
                    return resolve(term);
                 else
                     return reject(`Term could not be updated.`)
               });
        },
       
        //add new
        addTermEnglish: function (newterm) {
            return new Promise(function (resolve, reject) {
                englishTerms.create(newterm, (err, item) => {
                     if (err) {
                       return reject(err.message)
                    }
                     return resolve(item);
                    })
            })
        },

        //add new definition
        addDefinition: function(id,definition){
            // Attempt to locate the existing document
            return new Promise(function (resolve, reject) {
                englishTerms.findById(id,(error, term) => {
                    if (error)
                        return reject(error);
                    
                   if (term){
                        term.definitions.push(definition);
                        term.save();
                        return resolve();
                    }
                    else
                        return reject(`Term could not be updated.`);
                });
            });
        },

        //Increases the helpful variable
        yesIncrimentor: function(id) {
            return new Promise(function (resolve, reject) {
                let process;
                    process = englishTerms.findByIdAndUpdate(id, { $inc: { helpYes: 1 } }, { new: true });
                    process.exec((error, term) => {
                    if (error)
                        return reject(error.message);
                    else if (term)
                        return resolve(term.helpYes);
                    else
                        return reject(`Term could not be updated.`);
                });
            });
        },
        
        //Increases the Not helpful variable
        noIncrimentor: async function(id){
            return new Promise(function (resolve, reject) {
                let process;
                process = englishTerms.findByIdAndUpdate(id, { $inc: { helpNo: 1 } }, { new: true });
                process.exec((error, term) => {
                    if (error)
                        return reject(error.message);
                    else if (term)
                        return resolve(term.helpNo);
                    else
                        return reject(`Term could not be updated.`);
                });
            });
        },
            
        //Likes
        likesIncrimentor: function(t_id, d_id){
          return new Promise(function (resolve, reject) {
              process = englishTerms.update({ '_id': t_id, 'definitions._id': d_id }, { $inc: { 'definitions.$.likes': 1 } }, { new: true });
              process.exec((error, resultQuery) => {
                 if (error)
                     return reject(error.message);
                 else if (resultQuery.ok == 1)
                     return resolve(resultQuery);
                 else
                     return reject(`Definition could not be liked.`);
                }); 
            });
        },
        
        /************ NON-ENGLISH TERMS ***********/
    
        termsNonEnglishGetAll: function(){
            return new Promise((resolve, reject) =>{
                nonEnglishTerms.find()
                .sort({name: 'asc'})
                .exec((error, items) => {
                    if (error) {
                      // Query error
                      return reject(error.message);
                    }
                    // Found, a collection will be returned
                    return resolve(items);
                  });
            });
                 
        },

        termsNonEnglishGetById: function(termId){
            return new Promise((resolve, reject) =>{
                nonEnglishTerms.findById(termId, (err, item) => {
                     if (err) {
                         return reject(err.message);
                     }
                     if (item) { 
                         return resolve(item);
                     } else {
                         return reject ("Not found");
                     }
                 })
             });
        },

        getFromTermNonEnglish: async function(text){
            // Decode the incoming value
            text = decodeURIComponent(text);

            //Find the text passed in field
            let results = await englishTerms.find({ "wordEnglish": { "$regex": text, "$options": "i" } });
            results.exec((error, term) => {
               if (error)
                  return reject(error.message);
               else if (term)
                  return resolve(term);
               else
                   return reject(`Term could not be updated.`)
             });
        },

        addTermNonEnglish: function (newterm) {
            return new Promise(function (resolve, reject) {
                nonEnglishTerms.create(newterm, (err, item) => {
                     if (err) {
                       return reject(err.message)
                    }
                     return resolve(item);
                    })
            })
            
        },

        nonEgAddDefinition: function(id, definition){
                // Attempt to locate the existing document
                return new Promise(function (resolve, reject) {
                    nonEnglishTerms.findById(id,(error, term) => {
                        if (error)
                            return reject(error);
                        
                       if (term){
                            term.definitions.push(definition);
                            term.save();
                            return resolve();
                        }
                        else
                            return reject(`Term could not be updated.`);
                    });
                });
        },

        nonEgYesIncrimentor: function(id) {
            return new Promise(function (resolve, reject) {
                let process;
                    process = nonEnglishTerms.findByIdAndUpdate(id, { $inc: { helpYes: 1 } }, { new: true });
                    process.exec((error, term) => {
                    if (error)
                        return reject(error);
                    else if (term)
                        return resolve(term.helpYes);
                    else
                        return reject(`Term could not be updated.`);
                });
            });
        },
        
        nonEgNoIncrimentor: async function(id){
            return new Promise(function (resolve, reject) {
                let process;
                process = nonEnglishTerms.findByIdAndUpdate(id, { $inc: { helpNo: 1 } }, { new: true });
                process.exec((error, term) => {
                    if (error)
                        return reject(error);
                    else if (term)
                        return resolve(term.helpNo);
                    else
                        return reject(`Term could not be updated.`);
                });
            });
        },

        nonEgLikesIncrimentor: function(t_id, d_id){
            return new Promise(function (resolve, reject) {
                process = nonEnglishTerms.update({ '_id': t_id, 'definitions._id': d_id }, { $inc: { 'definitions.$.likes': 1 } }, { new: true });
                process.exec((error, resultQuery) => {
                   if (error)
                       return reject(error.message);
                   else if (resultQuery.ok == 1)
                       return resolve(resultQuery);
                   else
                       return reject(`Definition could not be liked.`);
                  }); 
            });
        
        }
    }
    
}