import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEstudianteComponent } from './asignar-estudiante.component';

describe('AsignarEstudianteComponent', () => {
  let component: AsignarEstudianteComponent;
  let fixture: ComponentFixture<AsignarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
