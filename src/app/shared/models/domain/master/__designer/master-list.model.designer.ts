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

// Define the MasterListBase class, extending the ViewModelBase class
export class MasterListBase extends ViewModelBase {    
    MasterListUId!: Guid;
    MasterListId!: number;
    Name!: string;
    Code!: string;
    Description!: string;
    Source!: string;
    ImageUrl!: string;
    DisplayOrder!: number;

   // Constructor for the MasterListBase class, calling the superclass constructor
   constructor() {
        super();
    }
}
