import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { ActivatedRoute } from '@angular/router';
import { NonEnglishTerms } from '../nonEnglishTerms';
import {Definitions } from '../definitions';


@Component({
  selector: 'app-view-non-english-term-details',
  templateUrl: './view-non-english-term-details.component.html',
  styleUrls: ['./view-non-english-term-details.component.css']
})
export class ViewNonEnglishTermDetailsComponent implements OnInit {
  
  term: NonEnglishTerms;
  
  
  constructor(private d: DataManagerService, private route: ActivatedRoute) {
    
  }
  id = this.route.snapshot.params['id'];
  

  ngOnInit() {
   
    this.d.getTermByIdNonEnglish(this.id).subscribe(u =>{ 
      this.term = u; })
  }
  
  like(){
    this.d.nonEngDefLikes(this.id,this.term.definitions[0]._id);
  }
  helpYes(){
    this.d.isHelpfulNonEng(this.term, this.id).subscribe(u =>{ 
      this.term.helpYes = u; })
  }

  helpNo(){
    this.d.isNotHelpfulNonEng(this.term, this.id).subscribe(u =>{ 
      this.term.helpNo = u; })
  }
}
