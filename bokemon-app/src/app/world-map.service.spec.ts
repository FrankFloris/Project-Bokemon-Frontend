import { TestBed } from '@angular/core/testing';

import { WorldMapService } from './world-map.service';

describe('WorldMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorldMapService = TestBed.get(WorldMapService);
    expect(service).toBeTruthy();
  });
});
