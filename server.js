//================================================================//
//Assigment 2 API - Jonathan Brown - Winter 2020
// Heroku - https://calm-mountain-03246.herokuapp.com/ 

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const mongodb = require("mongodb");

// Add support for incoming JSON entities
app.use(bodyParser.json());
// Add support for CORS
app.use(cors());

const manager = require("./manager.js");
const m = manager();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

 app.get("/api", (req, res) => {
        // Here are the resources that are available for users of this web API...
        // YOU MUST EDIT THIS COLLECTION
        const links = [];
        // This app's resources...
        links.push({"rel":"collection","href":"/api/languages","methods":"GET"});
        links.push({"rel":"collection","href":"/api/terms/english","methods":"GET,POST"});
        links.push({"rel":"collection","href":"/api/terms/other","methods":"GET,POST"});
    
  
        const linkObject = { 
            "apiName":"Web API for Assignment 2",
            "apiDescription":"Dictionary data for technical terms",
            "apiVersion":"1.0",
            "apiAuthor":"Jonathan Brown",
            "links": links
        };
        res.json(linkObject);
});

//==========  Routes for english terms ==========// 

//Get all
app.get("/api/terms/english", (req, res) => {
    // Call the manager method
    m.termsEnglishGetAll()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json({ "message": error });
      })
  });
  
  // Get one
  app.get("/api/terms/english/:id", (req, res) => {
    m.termsEnglishGetById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.status(404).json({ "message": "Resource not found" });
      })
  });
  
  // Get some, all
  app.get("/api/terms/english/:text", (req, res) => {
    m.getFromTermEnglish(req.params.text)
      .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.status(404).json({ "message": "Resource not found" });
      })
  });
  
  // Add new
  app.post("/api/terms/english", (req, res) => {
      m.addTermEnglish(req.body)
       .then((data) =>{
            res.json(data);
       })
       .catch((error) =>{
        res.status(500).json({ "message": error });
       })
   });

   //Add Definition 
   app.put("/api/terms/english/:id/addDefinition", (req, res) => {
    m.addDefinition(req.params.id, req.body)
     .then((data) =>{
          res.json(data);
     })
     .catch((error) =>{
      res.status(500).json({ "message": error });
     })
   });

   //Helpfulness Yes Incrimentor - Needs the term ID only
   app.put("/api/terms/english/addYes/:id", (req, res) => {
    m.yesIncrimentor(req.params.id)
     .then((data) =>{
          res.json(data);
     })
     .catch((error) =>{
        res.status(500).json({ "message": error });
     })
   });

      //Help No Incrimentor - Needs the term ID only
      app.put("/api/terms/english/addNo/:id", (req, res) => {
        m.noIncrimentor(req.params.id)
         .then((data) =>{
              res.json(data);
         })
         .catch((error) =>{
            res.status(500).json({ "message": error });
         })
       });

       //Likes Incrimentor - Needs term ID and definition ID
       app.put("/api/terms/english/addLikes/:id", (req, res) => {
        m.likesIncrimentor(req.params.id, req.body)
         .then((data) =>{
              res.json(data);
         })
         .catch((error) =>{
          res.status(500).json({ "message": error });
         })
       });        




 //****************************************************************//
 
 //==========  Routes for non-english terms ==========// 
    //Get all
    app.get("/api/terms/other", (req, res) => {
        // Call the manager method
        m.termsNonEnglishGetAll()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json({ "message": error });
         })
    });
  
    // Get one
    app.get("/api/terms/other/:id", (req, res) => {
        m.termsNonEnglishGetById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch(() => {
            res.status(404).json({ "message": "Resource not found" });
        })
    });
  
  // Get some, all
  app.get("/api/terms/other/:text", (req, res) => {
    m.getFromTermNonEnglish(req.params.text)
    .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.status(404).json({ "message": "Resource not found" });
      })
   });
  
   // Add new
  app.post("/api/terms/others", (req, res) => {
      m.termEnglish(req.body)
      .then((data) =>{
            res.json(data);
       })
       .catch((error) =>{
          res.status(500).json({ "message": error });
       })
   });

      //Add Definition - Term ID, Definition ID
      app.put("/api/terms/other/:id/addDefinition", (req, res) => {
        m.nonEgAddDefinition(req.params.id, req.data)
         .then((data) =>{
              res.json(data);
         })
         .catch((error) =>{
          res.status(500).json({ "message": error });
         })
       });
    
       //Help Yes Incrimentor - Only needs the ID of the term
       app.put("/api/terms/other/addYes/:id", (req, res) => {
        m.nonEgYesIncrimentor(req.params.id)
         .then((data) =>{
              res.json(data);
         })
         .catch((error) =>{
          res.status(500).json({ "message": error });
         })
       });
    
          //Help No Incrimentor - Only needs the ID of the term
          app.put("/api/terms/other/addNo/:id", (req, res) => {
            m.nonEgNoIncrimentor(req.params.id)
             .then((data) =>{
                  res.json(data);
             })
             .catch((error) =>{
              res.status(500).json({ "message": error });
             })
           });
    
           //Likes Incrimentor - Needs the ID of term and the ID of the Definition
           app.put("/api/terms/other/addLikes/:id", (req, res) => {
            m.nonEgLikesIncrimentor(req.params.id,req.body)
             .then((data) =>{
                  res.json(data);
             })
             .catch((error) =>{
              res.status(500).json({ "message": error });
             })
           }); 

 //****************************************************************//

  
   app.use((req, res) => {
     res.status(404).send("Resource not found");
    });

// ################################################################################

// Attempt to connect to the database, and
// tell the app to start listening for requests

m.connect().then(() => {
    app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
  })
  .catch((err) => {
      console.log("Unable to start the server:\n" + err);
      process.exit();
 });