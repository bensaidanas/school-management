import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    exports: [
        ButtonModule,
        PasswordModule,
        TableModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule,
        DialogModule,
        CardModule,
        InputTextareaModule
    ]
})

export class MaterialModule {}