import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    const url = `${this.apiRoot}/post`;
    this.http.post(url, {
      moo: 'foo',
      goo: 'loo',
    }, {
      observe: 'response'
    }).subscribe(resp => {
      console.log(resp);
    })
  }

  doPUT() {
    console.log('PUT');
    const url = `${this.apiRoot}/put`;
    this.http.put(url, {
      moo: 'foo',
      goo: 'loo',
    }, {
      observe: 'response'
    }).subscribe(resp => {
      console.log(resp);
    });
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
    const url = `${this.apiRoot}/get`;
    this.http.get(url)
      .toPromise()
      .then(res => {
        console.log(res);
      });
  }

  doGETAsPromisseError() {
    console.log('GET AS PROMISSE ERRROR');
    const url = `${this.apiRoot}/post`;
    this.http.get(url)
      .toPromise()
      .then(
        res => console.log(res),
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
      );
  }

  doGETAsObservableError() {
    console.log('GET AS OBSERVABLE ERROR');
    const url = `${this.apiRoot}/post`;
    this.http.get(url)
      .subscribe(
        res => console.log(res),
        msg => console.error(`Error: {msg.status} ${msg.statusText}`)
      );
  }

  doGETWithHeader() {
    console.log('GET WITH HEADERS');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', btoa('username:password'));
    const url = `${this.apiRoot}/get`;
    this.http.get(
      url,
      {headers: headers}
    ).subscribe(
        res => console.log(res),
        error => console.error(`Error: ${error.msg} ${error.status}`)
    )
  }
}
