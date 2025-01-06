/* Copyright (c) 2024 Accenture . All rights reserved.

// <copyright company="Accenture">
// Copyright (c) 2024 Accenture.  All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, 
// electronic, mechanical or otherwise, is prohibited without the prior written 
// consent of the copyright owner.
// </copyright> 

*/ 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ResourceLoader } from '../core/translator/resource-loader';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
    declarations: [],
	imports: [SortPipe, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useClass: ResourceLoader,
			deps: [HttpClient]
		},useDefaultLang:true
	})],
	providers: [ ],
    exports: [ CommonModule, FormsModule, ReactiveFormsModule, TranslateModule,SortPipe ]
})
export class SharedModule { }

