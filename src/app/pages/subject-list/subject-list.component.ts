import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  standalone: true,
  selector: 'app-subject-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-list.component.html'
})
export class SubjectListComponent implements OnInit {
  subjects: any[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjectService.getSubjectsWithUsers().subscribe(data => {
      this.subjects = data;
    });
  }
}
