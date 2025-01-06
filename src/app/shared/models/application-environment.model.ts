/* Copyright (c) 2024 Accenture . All rights reserved.

// <copyright company="Accenture">
// Copyright (c) 2024 Accenture.  All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, 
// electronic, mechanical or otherwise, is prohibited without the prior written 
// consent of the copyright owner.
// </copyright> 

*/ 

import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationEnvironment {
    public BaseUrl: string = '';
    public ClientUrl: string = '';
    public AuthProvider: string = '';
    public TenantId: string = '';
    public ClientId: string = '';
    public RedirectUrl: string = '';
    public ApiScope: string = '';
    public ApiKey: string = '';
    public Scope: string = ''; 
    public LoggedInUserEmail: string = '';    
    public IdealTime: number = 10;
    public FunctionKey: string = '';
}

// "AuthProvider": "DebugAuthProvider",
//     "BaseUrl": "http://localhost:5076",
//     "ClientUrl": "http://localhost:4200",
//     "TenantId": "3812ae5e-cd4a-45e4-8efc-e617b8e7c5db",
//     "ClientId": "24fba428-9698-4221-836f-6bb3c804034f",
//     "ApiScope": "api://fc8f964d-98f5-42eb-8fd5-66ecadb2ec4d/admin",
//     "LoggedInUserEmail": "arpan.shukla@mwphoenix.onmicrosoft.com",
//     "IdealTime": "60",
//     "FunctionKey": ""

