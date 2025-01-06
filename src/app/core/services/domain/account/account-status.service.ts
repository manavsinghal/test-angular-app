

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreEnvironmentService } from '../../../services/core.environment.service';
import { AccountStatusServiceBase } from './__designer/account-status.service.designer';

// Define the AccountStatusService class using the Injectable decorator, making it a singleton provided at the root level
@Injectable({ providedIn: 'root' })
export class AccountStatusService extends AccountStatusServiceBase {

    // Constructor for the  AccountStatusService class, injecting dependencies 
    constructor(
        protected override readonly http: HttpClient,
        protected override readonly coreEnvironmentService: CoreEnvironmentService) {
        super(http, coreEnvironmentService);
    }

}
