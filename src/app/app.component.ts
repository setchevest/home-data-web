/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';

import { AnalyticsService } from './@core/utils/analytics.service';
import { AbService } from './@core/utils/ab.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private activatedRoute: ActivatedRoute,
              private abService: AbService,
              private themeService: NbThemeService) {

    this.themeService.onThemeChange()
      .subscribe((theme: any) => {
        this.analytics.trackEvent('themeUsed', theme.name);
      });

    this.activatedRoute.queryParams
      .subscribe((params: any) => {
        if (params.theme && ['default', 'cosmic'].includes(params.theme)) {
          this.themeService.changeTheme(params.theme);
        }
      });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.abService.onAbEvent(AbService.VARIANT_THEME_CHANGE)
      .subscribe(() => {
        this.themeService.changeTheme('default');
      });
  }
}
