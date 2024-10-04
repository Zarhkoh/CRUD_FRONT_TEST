import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesShowComponent } from './articles-show.component';

describe('ArticlesShowComponent', () => {
  let component: ArticlesShowComponent;
  let fixture: ComponentFixture<ArticlesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
