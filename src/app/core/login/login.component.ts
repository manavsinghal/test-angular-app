 

import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, NgZone, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DefaultFields } from '../../shared/models/default-fields.model';
import { Theme } from '../../shared/models/theme.model';
import { CoreAuthenticationService } from '../services/core.authentication.service';
import { CoreEnvironmentService } from '../services/core.environment.service';
import { CoreSessionService } from '../services/core.session.service';
import { CoreSubscriptionService } from '../services/core.subscription.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
	selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
	imports:[SharedModule]
})
export class LoginComponent implements OnInit, OnDestroy {
	@ViewChild('content', { static: true }) modalContent!: TemplateRef<string>;
	loading: boolean = false;
	returnUrl!: string;
	hasChild!: string;
	loginFailure: boolean = false;
	errorMessage!: string;
	closeResult!: string;
	logoutUrl!: string;
	showLoader: boolean = true;

	constructor(private readonly route: ActivatedRoute,
		private readonly router: Router,
		private coreEnvironmentService:CoreEnvironmentService,
		private readonly subscriptionService: CoreSubscriptionService,
		public readonly coreSessionService: CoreSessionService,
		private readonly coreAuthenticationService: CoreAuthenticationService,
		private readonly ngZone: NgZone
	) {
		console.log('Login');
	}

	ngOnInit(): void {
		// debugger;
		if (this.coreSessionService.getSessionStorageItem('returnBackUrl') == null) {
			this.coreSessionService.setSessionStorageItem('returnBackUrl', this.route.snapshot.queryParams['redirectUrl'] || '/');
		}

		this.returnUrl = this.coreSessionService.getSessionStorageItem('returnBackUrl');
		this.hasChild = this.route.snapshot.queryParams['hasChild'];

		if (this.coreEnvironmentService.environment.AuthProvider === DefaultFields.AzureADAuthProvider) {
			if (this.coreAuthenticationService.getAccount() === null) {
				this.coreAuthenticationService.login();
			} else {
				console.log('LoginComponent is authenticated true');
            }

            this.coreSessionService.setTheme(Theme.Themes[0]);
            this.coreSessionService.setSelectedTheme(Theme.Themes[0]);
            this.coreSessionService.setSessionStorageItem(DefaultFields.LoggedInUserEmailId, this.coreEnvironmentService.environment.LoggedInUserEmail);

            this.ngZone.run((): void => {
                void this.router.navigateByUrl(this.returnUrl);
            });
		} else if (this.coreEnvironmentService.environment.AuthProvider === DefaultFields.DebugAuthProvider) {
			this.coreSessionService.setTheme(Theme.Themes[0]);
			this.coreSessionService.setSelectedTheme(Theme.Themes[0]);
			this.coreSessionService.setSessionStorageItem(DefaultFields.LoggedInUserEmailId, this.coreEnvironmentService.environment.LoggedInUserEmail);

			this.ngZone.run((): void => {
				void this.router.navigateByUrl(this.returnUrl);
			});
		}
	}

	ngOnDestroy(): void {
		//this.subscriptionService.unsubscribeSubscriptions(this);
	}

	confirmLogout(): void {
		//this.modalService.dismissAll(this.modalContent);
		this.coreSessionService.clear();
		if (this.coreEnvironmentService.environment) {
			if (this.coreEnvironmentService.environment.AuthProvider === DefaultFields.AzureADAuthProvider) {
				this.coreAuthenticationService.logout();
			}
		}
	}	
}

