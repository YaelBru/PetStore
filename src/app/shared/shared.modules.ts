import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SearchComponent } from '../pet-store/search/search.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { ChangeFormatPipe } from '../shared/change-format.pipe';




@NgModule({
    declarations: [
        SearchComponent,
        ChangeFormatPipe,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatIconModule
    ],
    exports: [
        CommonModule,
        NgbModule,
        MatIconModule,
        SearchComponent,
        ChangeFormatPipe,
        SpinnerComponent
    ]
})
export class SharedModule { }