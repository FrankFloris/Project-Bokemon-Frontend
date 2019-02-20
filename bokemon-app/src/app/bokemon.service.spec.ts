import { TestBed } from '@angular/core/testing';

import { BokemonService } from './bokemon.service';

describe('BokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BokemonService = TestBed.get(BokemonService);
    expect(service).toBeTruthy();
  });
});
