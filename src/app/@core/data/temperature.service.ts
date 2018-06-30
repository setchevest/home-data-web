import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './appconfig.service';


@Injectable()
export class TemperatureService {

  constructor(private httpClient: HttpClient, appConfigService: AppConfigService) {
    this.turnOnUrl = appConfigService.SERVER_API_URL + 'thermostat/turnon';
    this.turnOffUrl = appConfigService.SERVER_API_URL + 'thermostat/turnoff';
    this.getStatusUrl = appConfigService.SERVER_API_URL + 'thermostat/status';
    this.setAutoModeUrl = appConfigService.SERVER_API_URL + 'thermostat/setautomode';
    this.setManualModeUrl = appConfigService.SERVER_API_URL + 'thermostat/setmanualmode';
  }

  private readonly turnOnUrl: string;
  private readonly turnOffUrl: string;
  private readonly getStatusUrl: string;
  private readonly setAutoModeUrl: string;
  private readonly setManualModeUrl: string;

  public getCurrentStatus(): Observable<any> {
    return this.httpClient.get(this.getStatusUrl);
  }

  public setHeaterParams(data: any): Observable<any> {
    if (data.isOn) {
      return this.turnOffHeater();
    }
    return this.turnOnHeater();
  }

  public turnOnHeater(): Observable<any> {
    return this.httpClient.post(this.turnOnUrl, null);
  }

  public turnOffHeater(): Observable<any> {
    return this.httpClient.post(this.turnOffUrl, null);
  }
}
