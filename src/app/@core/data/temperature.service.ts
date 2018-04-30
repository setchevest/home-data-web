import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';

@Injectable()
export class TemperatureService {

  constructor(private httpClient: HttpClient) {
    // this.userArray = Object.values(this.users);
  }

  private readonly setHeaterModeUrl = 'http://localhost:8080/api/heaterstatus/setHeaterMode';
  private readonly getCurrentStatusUrl = 'http://localhost:8080/api/heaterstatus/getCurrentStatus';

  getCurrentTemperature(): Observable<any> {
    return this.httpClient.get(this.getCurrentStatusUrl);
  }

  setHeaterParams(data: any = { mode: "manual", isOn: true, temperature: 22 }) : Observable<any> {
    return this.httpClient.post(this.setHeaterModeUrl,data);
  }
}
