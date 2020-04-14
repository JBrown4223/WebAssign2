import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {DataManagerService} from '../data-manager.service'
import { NonEnglishTerms } from '../nonEnglishTerms';

@Component({
  selector: 'app-viewNonEnglishTerms',
  templateUrl: './view-non-english-terms.component.html',
  styleUrls: ['./view-non-english-terms.component.css']
})

export class ViewNonEnglishTermsComponent implements OnInit {

  constructor(private d: DataManagerService) { }
  iModel: NonEnglishTerms[];
  ngOnInit() {
    this.d.getTermsNonEnglish().subscribe( response => this.iModel = response)
  }

}
