const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var termsNonEnglish = new Schema({
    termEnglishId: Object,
    wordEnglish: String,
    wordNonEnglish: String,
    wordExpanded: String,
    languageCode: String,
    image: String,
    imageType: String,  
    audio: String,
    audioType: String,
    linkAuthoritative: String,
    linkWikipedia: String,
    linkYouTube: String,
    authorName: String,
    dateCreated: Date,
    dateRevised: Date,
    fieldOfStudy: String,   
    helpYes: Number,
    helpNo: Number,
    definitions: Array 
});

module.exports = termsNonEnglish;