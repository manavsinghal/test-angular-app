

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Guid } from '../../../../../core/helpers/guid';
import { CoreEnvironmentService } from '../../../../services/core.environment.service';
import { CoreNotificationService } from '../../../../services/core.notification.service';
import { AccountStatus } from '../../../../../shared/models/domain/account/account-status.model';

// Define the AccountStatusServiceBase class using the Injectable decorator, making it a singleton provided at the root level
@Injectable({ providedIn: 'root' })
export class AccountStatusServiceBase {

	getAccountStatusesUrl! : string;
	mergeAccountStatusesUrl! : string;

    // Constructor for the AccountStatusServiceBase class, injecting dependencies
    constructor(
        protected readonly http: HttpClient,
        protected readonly coreEnvironmentService: CoreEnvironmentService) {
    }

	getAccountStatuses(accountStatusUId?: string): Observable<Array<AccountStatus>> {
         // Construct the URL for the API request
        let url: string = this.coreEnvironmentService.environment.BaseUrl;
        this.getAccountStatusesUrl = this.coreEnvironmentService.serviceUrls['GetAccountStatusUrl'];

        url = url + this.getAccountStatusesUrl;
        url = url.replace('{accountStatusUId}', accountStatusUId ? accountStatusUId : Guid.empty);
        // Set the HTTP headers for the request
        let httpHeaders: HttpHeaders = new HttpHeaders({'x-functions-key':this.coreEnvironmentService.environment.FunctionKey});
        // Make the GET request and handle the response
        return this.http.get<Array<AccountStatus>>(url,{ headers: httpHeaders })
              // Map the response data to an array of AccountStatus objects
              .pipe(map((data: Array<AccountStatus>): Array<AccountStatus> => data),
                // Handle any errors that occur during the request
                catchError( ( error : HttpErrorResponse ) => {
				CoreNotificationService.handleError( error );
				throw error; // rethrow the error to propagate it downstream
			    }
            ));
    }

    mergeAccountStatuses(accountstatuses: Array<AccountStatus>): Observable<Response> {
        let url: string = this.coreEnvironmentService.environment.BaseUrl;
        this.mergeAccountStatusesUrl = this.coreEnvironmentService.serviceUrls['MergeAccountStatusUrl'];
        
        // Construct the URL for the API request
        url = url + this.mergeAccountStatusesUrl;
        // Set the HTTP headers for the request
        let httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'CorrelationUId': Guid.newGuid(), 'x-functions-key': this.coreEnvironmentService.environment.FunctionKey });
       // Make the POST request and handle the response
       return this.http.post<Response>(url, JSON.stringify(accountstatuses),{ headers: httpHeaders })
             // Map the response data to a Response object
            .pipe(map((data: Response) => data),
                // Handle any errors that occur during the request
                catchError( ( error : HttpErrorResponse ) => {
				CoreNotificationService.handleError( error );
				throw error; // rethrow the error to propagate it downstream
			    }
            ));
    }
}
