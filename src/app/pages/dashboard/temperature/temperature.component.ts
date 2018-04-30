import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TemperatureService } from '../../../@core/data/temperature.service';

@Component({
  selector: 'ngx-temperature',
  styleUrls: ['./temperature.component.scss'],
  templateUrl: './temperature.component.html',
})


export class TemperatureComponent implements OnInit, OnDestroy {

  temperature = 0;
  temperatureOff = true;
  temperatureMode = 'cool';

  humidity = 0;
  humidityOff = false;
  humidityMode = 'heat';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private temperatureService: TemperatureService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });

  }

  ngOnInit(): void {
    var self = this;

    this.temperatureService.getCurrentTemperature().subscribe((data) => {
      if (!data.error) {
        self.temperatureOff = !<boolean>data.data.isOn;
        self.temperature = data.data.temperature;
      }
    });

  }

  onPowerChanged(event: boolean): boolean {
    var self = this;
    this.temperatureService.setHeaterParams({ mode: "manual", isOn: event, temperature: this.temperature }).subscribe((data) => {
      if (!data.error) {
        self.temperatureOff = !<boolean>data.data.isOn;
        self.temperature = data.data.temperature;
      }
    })
    return true;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
