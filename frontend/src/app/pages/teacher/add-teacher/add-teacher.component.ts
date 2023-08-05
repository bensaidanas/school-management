import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  selectedSubject!: Subject;
  phone!: string;
  address!: string;
  subjects!: Subject[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  getAllSubjects()  {
    this.teacherService.getAllSubjects().subscribe(res => {
      this.subjects = res
    })
  }

  confirm(): void {
    const data: Partial<Teacher> = {
      address: this.address,
      phoneNumber: this.phone,
      subject: this.selectedSubject
    }
    console.log(data)
    // this.ref.close(data);
  }

  cancel(): void {
    this.ref.close(null);
  }
}