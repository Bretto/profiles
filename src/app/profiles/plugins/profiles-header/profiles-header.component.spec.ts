import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesHeaderComponent } from './profiles-header.component';

describe('ProfilesHeaderComponent', () => {
  let component: ProfilesHeaderComponent;
  let fixture: ComponentFixture<ProfilesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
