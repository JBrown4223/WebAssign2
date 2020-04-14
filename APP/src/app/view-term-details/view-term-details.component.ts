import { Component, OnInit } from '@angular/core';
import { EnglishTerms} from '../englishTerms';
import { DataManagerService } from '../data-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewEnglishDetail',
  templateUrl: './view-term-details.component.html', 
  styleUrls: ['./view-term-details.component.css']
})

export class ViewTermDetailsComponent implements OnInit {

  constructor(private d: DataManagerService, private route: ActivatedRoute) {
  }
  term: EnglishTerms;
  id = this.route.snapshot.params['id'];

  ngOnInit() {
   
    this.d.getTermByIdEnglish(this.id).subscribe(u =>{ 
      this.term = u; })
  }
  
  like(){
      this.d.defLikes(this.term._id, this.term.definitions[0]._id);
  }
  helpYes(){
    this.d.isHelpful(this.term, this.id).subscribe(u =>{ 
      this.term.helpYes = u; })
  }

  helpNo(){
    this.d.isNotHelpful(this.term, this.id).subscribe(u =>{ 
      this.term.helpNo = u; })
  }

}
