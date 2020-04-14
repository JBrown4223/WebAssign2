import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../data-manager.service'
import { EnglishTerms } from '../englishTerms';

@Component({
  selector: 'app-englishTerms',
  templateUrl: './view-english-terms.component.html',
  styleUrls: ['./view-english-terms.component.css']
})


export class ViewEnglishTermsComponent implements OnInit {

  constructor( private d: DataManagerService) { }
  iModel: EnglishTerms[];
  ngOnInit() {
    this.d.getTermsEnglish().subscribe( response => this.iModel = response)
  }
}

