

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreEnvironmentService } from '../../../services/core.environment.service';
import { AccountServiceBase } from './__designer/account.service.designer';

// Define the AccountService class using the Injectable decorator, making it a singleton provided at the root level
@Injectable({ providedIn: 'root' })
export class AccountService extends AccountServiceBase {

    // Constructor for the  AccountService class, injecting dependencies 
    constructor(
        protected override readonly http: HttpClient,
        protected override readonly coreEnvironmentService: CoreEnvironmentService) {
        super(http, coreEnvironmentService);
    }

}
