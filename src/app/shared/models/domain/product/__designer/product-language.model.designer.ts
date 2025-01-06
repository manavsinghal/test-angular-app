/* Copyright (c) 2024 Accenture . All rights reserved.

// <copyright company="Accenture">
// Copyright (c) 2024 Accenture.  All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, 
// electronic, mechanical or otherwise, is prohibited without the prior written 
// consent of the copyright owner.
// </copyright>
*/

// Import necessary modules and classes
import { Guid } from '../../../../../core/helpers/guid';
import { ViewModelBase } from '../../../view-model-base.model';

// Define the ProductLanguageBase class, extending the ViewModelBase class
export class ProductLanguageBase extends ViewModelBase {    
    ProductLanguageUId!: Guid;
    ProductLanguageId!: number;
    ProductUId!: Guid;
    LanguageUId!: Guid;
    Name!: string;

   // Constructor for the ProductLanguageBase class, calling the superclass constructor
   constructor() {
        super();
    }
}
