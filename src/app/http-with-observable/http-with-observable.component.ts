import { SearchWithObservableService } from './search-with-obsevable.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-with-observable',
  templateUrl: './http-with-observable.component.html',
  styleUrls: ['./http-with-observable.component.css']
})
export class HttpWithObservableComponent implements OnInit {

  constructor(private service: SearchWithObservableService) { }

  ngOnInit(): void {
    this.service.search('moo').subscribe(resp => {
      
    })
  }

}
