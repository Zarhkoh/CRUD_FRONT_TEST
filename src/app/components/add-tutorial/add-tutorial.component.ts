import { Component } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial = {
    title: '',
    description: '',
    published: false,
    image: null as File | null
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('title', this.tutorial.title);
    formData.append('description', this.tutorial.description);
    formData.append('published', this.tutorial.published.toString());
    if (this.tutorial.image) {
      formData.append('image', this.tutorial.image);
    }

    this.tutorialService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
      image: null
    };
  }

  selectFile(event: any): void {
    if (event.target.files.length > 0) {
      this.tutorial.image = event.target.files[0];
    }
  }
}
