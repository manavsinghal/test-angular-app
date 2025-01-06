import { Component, importProvidersFrom, OnInit, Provider } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CoreSessionService, ThemeChanged } from './core/services/core.session.service';
import { DefaultFields } from './shared/models/default-fields.model';
import { Theme } from './shared/models/theme.model';
import { SharedModule } from './shared/shared.module';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SharedModule,NgxUiLoaderModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test-angular-app';

  isIframe: boolean = false;
  loggedIn: boolean = false;
  languageChangedSubscription!: Subscription;
  themeChangedSubscription!: Subscription;
  languageResourceChangedSubscribtion!: Subscription;
  selectedTheme!: Theme;
  imagePath!: string;
  logoUrl!: string;
  loading!: string;
  loaderTextChangedSubscription!: Subscription;

  constructor(
    readonly translateService:TranslateService,
  	readonly coreSessionService: CoreSessionService,
  ) {
  	this.selectedTheme = this.coreSessionService.getTheme();
  }
  ngOnInit(): void {
    if (this.coreSessionService.getTheme()) {
      this.loadThemes(this.coreSessionService.getTheme());
    }
    this.languageChangedSubscription = this.coreSessionService.languageChanged.subscribe((): void => {
      this.onLanguageChanged();
    });
    this.loaderTextChangedSubscription = this.coreSessionService.loaderTextChanged.subscribe((text: string): void => {
      this.translateService.get(text).subscribe((data: string): string => this.loading = data);
    });
    this.themeChangedSubscription = this.coreSessionService.themeChanged.subscribe((eventArgs: ThemeChanged): void => {
      this.loadThemes(eventArgs.Theme);
    });
    this.languageResourceChangedSubscribtion = this.coreSessionService.resourcesLoaded.subscribe((): void => {
      this.setLogoUrlBasedOnLanguageTheme();
    });
    this.isIframe = window !== window.parent && !window.opener;
  }
  
  loadThemes(theme: Theme): void {
    this.selectedTheme = theme;
    this.setLogoUrlBasedOnLanguageTheme();
  }
  
  onLanguageChanged(): void {
    this.translateService.setDefaultLang(this.coreSessionService.getLanguage());
    this.setLogoUrlBasedOnLanguageTheme();
  }
  
  setLogoUrlBasedOnLanguageTheme(): void {
    this.logoUrl = 'themes/{selectedTheme}/images/{imagePath}icon-ngx-load-logo-txt.png';
    if (this.coreSessionService.getLanguage() !== DefaultFields.EnglishLanguageUId) {
      this.imagePath = sessionStorage.getItem(DefaultFields.Culture) + '/';
    } else {
      this.imagePath = '';
    }
    this.logoUrl = this.logoUrl.replace('{selectedTheme}', this.selectedTheme?.Value);
    this.logoUrl = this.logoUrl.replace('{imagePath}', this.imagePath);
    this.translateService.get('PleaseWaitWhileProcessing').subscribe((data: string): string => this.loading = data);
  }
}
