import { NgModule } from "@angular/core";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree'

// import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    exports: [
        MatSlideToggleModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTableModule,
        MatTreeModule
    ]
})

export class MaterialModule {}