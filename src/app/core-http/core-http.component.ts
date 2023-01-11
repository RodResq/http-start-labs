import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';

@Component({
  selector: 'app-core-http',
  templateUrl: './core-http.component.html',
  styleUrls: ['./core-http.component.css']
})
export class CoreHttpComponent implements OnInit {

  apiRoot: string = '"http://httpbin.org';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  doGET() {
    console.log('GET');
  }

  doPOST() {
    console.log('POST');
  }

  doPUT() {
    console.log('PUT');
  }

  doDELETE() {
    console.log('DELETE');
  }

  doGETAsPromise() {
    console.log('GET AS PROMISSE');
  }

  doGETAsPromisseError() {
    console.log('GET AS PROMISSE ERRROR');
  }

  doGETAsObservableError() {
    console.log('GET AS OBSERVABLE ERROR');
  }

  doGETWithHeader() {
    console.log('GET WITH HEADERS');
  }

}
