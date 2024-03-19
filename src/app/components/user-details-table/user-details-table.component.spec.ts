import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsTableComponent } from './user-details-table.component';

describe('UserDetailsTableComponent', () => {
  let component: UserDetailsTableComponent;
  let fixture: ComponentFixture<UserDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
