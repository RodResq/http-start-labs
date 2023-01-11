import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-core-http',
  templateUrl: './core-http.component.html',
  styleUrls: ['./core-http.component.css']
})
export class CoreHttpComponent implements OnInit {

  apiRoot: string = 'http://httpbin.org';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  doGET() {
    console.log('GET');
    let params = new HttpParams();
    params = params.append('sk8', 'street');
    params = params.append('teste', 'xpto');
    let url = `${this.apiRoot}/get`;
    this.http.get(
      url,
      {
        observe: 'body',
        params: params,
      },
      ).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  doPOST() {
    console.log('POST');
  }

  doPUT() {
    console.log('PUT');
  }

  doDELETE() {
    console.log('DELETE');
    let params = new HttpParams().appendAll({
      foo: 'moo',
      limit: 25
    })
    const url = `${this.apiRoot}/delete`;
    this.http.delete(url, {
      params: params
    }).subscribe(res => {
      console.log(res);
    })
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
