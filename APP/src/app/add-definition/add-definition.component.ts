import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { DataManagerService } from '../data-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Definitions } from '../definitions';
import { EnglishTerms } from '../englishTerms';

@Component({
  selector: 'app-add-definition',
  templateUrl: './add-definition.component.html',
  styleUrls: ['./add-definition.component.css']
})
export class AddDefinitionComponent implements OnInit {

  newDefinition: Definitions;
 term: EnglishTerms;
 termID: String;


 
  constructor(private d: DataManagerService, private route: ActivatedRoute, private router: Router) { 
    
    this.newDefinition = new Definitions();
    
    this.newDefinition.authorName = '';
    this.newDefinition.dateCreated = new Date();
    this.newDefinition.definition = '';
    this.newDefinition.quality = 0;
    this.newDefinition.likes = 0; 
   
  }

  ngOnInit() {
    this.termID = this.route.snapshot.params['id'];

    this.d.getTermByIdEnglish(this.termID).subscribe( u =>{
      this.term = u;
    })
  
    //Initialize Definition object 
   this.newDefinition.authorName = this.term.authorName;
 
  }

  onSubmit(){
    console.log();
    this.d.addEnglishDefinition(this.newDefinition,this.termID).subscribe(u => {
      this.newDefinition = u;
      this.router.navigate([`/viewEnglishTermDetail/${this.termID}`]);
    });
  }

}
