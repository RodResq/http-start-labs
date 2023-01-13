import { SearchService } from './search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-with-promisse',
  templateUrl: './http-with-promisse.component.html',
  styleUrls: ['./http-with-promisse.component.css']
})
export class HttpWithPromisseComponent implements OnInit {
  itunes: any[] = [];
  loading:boolean = false;

  constructor(private searchService: SearchService) { 
  }

  ngOnInit(): void {
    
  }

  doSearch(term: string) {
    this.loading = true;
    this.searchService
      .search(term)
      .then((resp:any) => {
        this.itunes = resp.results;
      }).finally(() => {
        this.loading = false;
      });
  }

}
