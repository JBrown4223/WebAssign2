import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { EnglishTerms } from '../englishTerms';
import { DataManagerService } from '../data-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Definitions } from '../definitions';

@Component({
  selector: 'app-addTerm',
  templateUrl: './create-english-term.component.html',
  styleUrls: ['./create-english-term.component.css']
})


export class CreateEnglishTermComponent implements OnInit {
 newWord: EnglishTerms;
 temp: Definitions;
 formError: String;
 defString: String
 location: Location;

  constructor(private d: DataManagerService, private router: Router, private route: ActivatedRoute) { 
    this.newWord = new EnglishTerms();
    this.temp = new Definitions();
    //Initialization of new Object to empty state
    this.newWord.wordEnglish = '';
    this.newWord.wordNonEnglish = '';
    this.newWord.wordExpanded ='';
    this.newWord.languageCode="en-ca";
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

       //Definiton Initialization
       this.temp.authorName= '';
       this.temp.dateCreated = this.newWord.dateCreated;
       this.temp.definition = '';
       this.temp.quality = 0; 
       this.temp.likes = 0;
    this.newWord.definitions =[this.temp];

   
  }
  

  ngOnInit() { 
  }

  onSubmit(){ 
    /*
      The function will do the folowing tasks
      1 - Check that all required fields are completed and not null
      2 - Create new englishTerm
      3 - Redirect to EnglishTerms List
     
    */

    if(this.newWord.wordEnglish && this.newWord.authorName && this.newWord.languageCode && this.newWord.dateCreated && this.newWord.dateRevised){
        
      this.d.addNewTermEnglish(this.newWord).subscribe(u => {
          this.newWord = u;
          this.router.navigate(['/viewEnglishTerms']);
        });

    }
    else{
      console.log("Error: failed to add word");
      this.formError = "Data entry error - all fields are required"
    }
  }

  goBack(){
    this.router.navigate(['/viewEnglishTerms']);
  }

}

