/* Copyright (c) 2024 Accenture . All rights reserved.

// <copyright company="Accenture">
// Copyright (c) 2024 Accenture.  All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, 
// electronic, mechanical or otherwise, is prohibited without the prior written 
// consent of the copyright owner.
// </copyright> 

*/ 


// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreSessionService, ThemeChanged } from '../../core/services/core.session.service';
import { Theme } from '../../shared/models/theme.model';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Define the Home Component
@Component({
    // Selector for the component
    selector: 'app-home',
    // Template URL for the component
    templateUrl: './home.component.html',
	imports:[SharedModule],
	standalone:true,
})
export class HomeComponent implements OnInit {
	languageChangedSubscription!: Subscription;
	selectedTheme: Theme;
	themeChangedSubscription!: Subscription;

    // Constructor for the component
	constructor(readonly translateService:TranslateService,
		public coreSessionService: CoreSessionService) {
			console.log('Home');
		this.selectedTheme = this.coreSessionService.getTheme();
		this.translateService.setDefaultLang(this.coreSessionService.getLanguage());
	}

    /**
    // Represents ngOnInit method
    // Lifecycle hook for initialization
    // @returns {void} - ngOnInit method returns void.
    */
	ngOnInit(): void {
		if (this.coreSessionService.getTheme()) {
			this.loadThemes(this.coreSessionService.getTheme());
		}
		this.languageChangedSubscription = this.coreSessionService.languageChanged.subscribe((): void => {
			this.onLanguageChanged();
		});
		this.themeChangedSubscription = this.coreSessionService.themeChanged.subscribe((eventArgs: ThemeChanged): void => {
			this.loadThemes(eventArgs.Theme);
		});
	}

    /**
    // Represents loadThemes method
    // @param WebShop theme - theme method param.
    // @returns {void} - loadThemes method returns void.
    */
	loadThemes(theme: Theme): void {
		this.selectedTheme = theme;
	}	

    /**
    // Represents onLanguageChanged method
    // @returns {void} - onLanguageChanged method returns void.
    */
	onLanguageChanged(): void {
			this.translateService.setDefaultLang(this.coreSessionService.getLanguage());
			
	  
	}
}

