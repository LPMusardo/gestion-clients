import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AppModule } from '../../app.module';
import { UserDetailsTableComponent } from './user-details-table.component';

describe('UserDetailsTableComponent', () => {
  let component: UserDetailsTableComponent;
  let fixture: ComponentFixture<UserDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsTableComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsTableComponent);
    component = fixture.componentInstance;
    component.dataSource = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
