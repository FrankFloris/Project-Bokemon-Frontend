import { TestBed } from '@angular/core/testing';

import { BokemonTemplateService } from './bokemon-template.service';

describe('BokemonTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BokemonTemplateService = TestBed.get(BokemonTemplateService);
    expect(service).toBeTruthy();
  });
});
