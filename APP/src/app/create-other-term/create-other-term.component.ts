import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Location} from '@angular/common';
import { NonEnglishTerms } from '../nonEnglishTerms';
import { DataManagerService } from '../data-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Languages } from '../languages';
import { Definitions } from '../definitions';
import { EnglishTerms } from '../englishTerms';

@Component({
  selector: 'app-create-other-term',
  templateUrl: './create-other-term.component.html',
  styleUrls: ['./create-other-term.component.css']
})
export class CreateOtherTermComponent implements OnInit {
  existingWord: EnglishTerms;
  newWord: NonEnglishTerms;
  temp: Definitions;
  formError: String;
  defString: String
  location: Location;
  id: string;
  currentLanguage: number = 0;
  LangArray: Languages[] = [{_id:"", name: "", code: ""}];

  constructor(private d: DataManagerService, private router: Router, private route: ActivatedRoute, private l: Languages) { 
   
    this.id = this.route.snapshot.params['id']; //1- Get ID

    this.newWord = new NonEnglishTerms();
    this.existingWord = new EnglishTerms();
    this.temp = new Definitions();
    

    //Initialization of existing Term
    this.existingWord.wordEnglish = "";
    this.existingWord.wordNonEnglish = "";
    this.existingWord.wordExpanded = "";
    this.existingWord.languageCode = "";
    this.existingWord.image = "";
    this.existingWord.imageType = "";
    this.existingWord.audio = "";
    this.existingWord.audioType = "";
    this.existingWord.linkAuthoritative = "";
    this.existingWord.linkWikipedia = "";
    this.existingWord.linkYouTube = "";
    this.existingWord.authorName = "";
    this.existingWord.fieldOfStudy = "";
    this.existingWord.dateCreated = new Date();
    this.existingWord.dateRevised = new Date();
    this.existingWord.helpNo = 0;
    this.existingWord.helpYes = 0;

    //Definiton Initialization
    this.temp.authorName= '';
    this.temp.dateCreated = this.newWord.dateCreated;
    this.temp.definition = '';
    this.temp.quality = 0; 
    this.temp.likes = 0;
    
    this.currentLanguage = 0;

    //Initialization of new Object to empty state
    this.newWord.wordNonEnglish = '';
    this.newWord.termEnglishId='';
    this.newWord.wordExpanded ='';
    this.newWord.languageCode='';
    this.newWord.image='';
    this.newWord.imageType='';  
    this.newWord.audio ='';
    this.newWord.audioType='';
    this.newWord.linkAuthoritative='';
    this.newWord.linkWikipedia='';
    this.newWord.linkYouTube='';
    this.newWord.authorName='';
    this.newWord.dateCreated= new Date();
    this.newWord.dateRevised= new Date();
    this.newWord.fieldOfStudy='';   
    this.newWord.helpYes=0;
    this.newWord.helpNo =0;
    this.newWord.defString='';
    this.newWord.definitions =[this.temp]; 
  }

  ngOnInit() {

      this.d.getLanguages().subscribe( u =>{
        this.LangArray = u;
      });
  
    this.d.getTermByIdEnglish(this.id).subscribe(u =>{
      this.existingWord = u; // 3 - Store the english word
    })
   
    this.newWord.termEnglishId= this.id; // 2 - Set the english term ID for the translation
 
  }
  
  onSubmit(){ 
    /*
      The function will do the folowing tasks
      1 - Check that all required fields are completed and not null
      2 - Create new non-EenglishTerm
      3 - Redirect to NonEnglishTerms List
     
    */

    if(this.newWord.wordEnglish && this.newWord.authorName && this.newWord.languageCode && this.newWord.dateCreated && this.newWord.dateRevised){
      
      this.temp.authorName= this.newWord.authorName;
      this.temp.definition=this.newWord.defString;
      this.newWord.definitions.push(this.temp);

      this.newWord.wordEnglish = this.existingWord.wordEnglish; // 4 - Set english word for the translation
      this.newWord.languageCode= this.LangArray[this.currentLanguage].code;

      this.d.addNonEnglishTerm(this.newWord).subscribe(u => {
          this.newWord = u;
          this.router.navigate(['/viewNonEnglishTerms']);
        });
        

    }
    else{
      console.log("Error: failed to add word");
      this.formError = "Data entry error - all fields are required"
    }
  }

  setLanguage(){
    console.log(this.currentLanguage)
  }
  goBack(){
    this.router.navigate(['/viewNonEnglishTerms']);
  }

}
