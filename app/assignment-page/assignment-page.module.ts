import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { assignmentPageRoutingModule } from './assignment-page-routing.module';
import { assignmentPage} from './assignment.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        assignmentPageRoutingModule
    ],
    declarations: [assignmentPage]
  
})
export class assignmentPageModule {}