import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    el = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new HighlightDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
