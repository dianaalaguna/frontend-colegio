import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  standalone: true,
  selector: 'app-subject-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-detail.component.html'
})
export class SubjectDetailComponent implements OnInit {
  subject: any = null;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectById(id).subscribe(subject => {
        this.subject = subject;
      });
    }
  }
}
