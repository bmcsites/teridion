// Angular's
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  // create call to server to get persons.
  getpeaple() {
    return this.http.get('assets/data/data.json');
  }
}
