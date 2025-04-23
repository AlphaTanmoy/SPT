import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-darjeeling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './darjeeling.component.html',
  styleUrls: ['./darjeeling.component.css']
})
export class DarjeelingComponent {
  images = [
    'assets/darjeeling/img1.jpeg',
    'assets/darjeeling/img2.jpeg',
    'assets/darjeeling/img1.jpeg',
    'assets/darjeeling/img2.jpeg',
    'assets/darjeeling/img1.jpeg',
    'assets/darjeeling/img2.jpeg'
  ];

  lightboxActive = false;
  selectedImage = '';
  currentIndex = 0;

  openLightbox(img: string) {
    this.selectedImage = img;
    this.currentIndex = this.images.indexOf(img);
    this.lightboxActive = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  }

  closeLightbox() {
    this.lightboxActive = false;
    document.body.style.overflow = 'auto';
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }
}
