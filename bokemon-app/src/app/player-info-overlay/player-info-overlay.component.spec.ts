import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoOverlayComponent } from './player-info-overlay.component';

describe('PlayerInfoOverlayComponent', () => {
  let component: PlayerInfoOverlayComponent;
  let fixture: ComponentFixture<PlayerInfoOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInfoOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInfoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
