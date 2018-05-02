import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './appconfig.service';


@Injectable()
export class TemperatureService {

  constructor(private httpClient: HttpClient, appConfigService: AppConfigService) {
    this.setHeaterModeUrl = appConfigService.SERVER_API_URL + "heaterstatus/setHeaterMode";
    this.getCurrentStatusUrl = appConfigService.SERVER_API_URL + "heaterstatus/getCurrentStatus";
  }

  private readonly setHeaterModeUrl: string = 'http://localhost:8080/api/heaterstatus/setHeaterMode';
  private readonly getCurrentStatusUrl: string = 'http://localhost:8080/api/heaterstatus/getCurrentStatus';

  getCurrentTemperature(): Observable<any> {
    return this.httpClient.get(this.getCurrentStatusUrl);
  }

  setHeaterParams(data: any = { mode: 'manual', isOn: true, temperature: 22 }): Observable<any> {
    return this.httpClient.post(this.setHeaterModeUrl, data);
  }
}
