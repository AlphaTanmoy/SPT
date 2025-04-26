import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puri',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puri.component.html',
  styleUrls: ['./puri.component.css']
})
export class PuriComponent {
  images = [
    'puri/img1.jpg',
    'puri/img2.jpg',
    'puri/img3.jpg',
    'puri/img4.jpg',
    'puri/img5.jpg',
    'puri/img6.jpg',
    'puri/img7.jpg',
    'puri/img8.jpg',
    'puri/img9.jpg',
    'puri/img10.jpg',
    'puri/img11.jpg',
    'puri/img12.jpg'
  ];

  // Lightbox state
  lightboxActive = false;
  selectedImage = '';
  currentIndex = 0;

  // Zoom and pan state
  scale = 1;
  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;
  prevTranslateX = 0;
  prevTranslateY = 0;

  // Image aspect ratios
  imageAspectRatios: { [key: string]: number } = {};

  // Open lightbox with selected image
  openLightbox(img: string) {
    this.selectedImage = img;
    this.currentIndex = this.images.indexOf(img);
    this.lightboxActive = true;
    this.resetZoom();
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  closeLightbox() {
    this.lightboxActive = false;
    document.body.style.overflow = 'auto';
    this.resetZoom();
  }

  // Navigation methods
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
    this.resetZoom();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
    this.resetZoom();
  }

  // Zoom methods
  zoomIn() {
    this.scale += 0.25;
  }

  zoomOut() {
    if (this.scale > 0.5) {
      this.scale -= 0.25;
    }
    if (this.scale <= 1) {
      this.resetPosition();
    }
  }

  resetZoom() {
    this.scale = 1;
    this.resetPosition();
  }

  resetPosition() {
    this.translateX = 0;
    this.translateY = 0;
    this.prevTranslateX = 0;
    this.prevTranslateY = 0;
  }

  // Image loading handler
  onImageLoad(img: string, event: Event) {
    const imgElement = event.target as HTMLImageElement;
    this.imageAspectRatios[img] = imgElement.naturalHeight / imgElement.naturalWidth;
  }

  // Check if image is portrait
  isPortrait(img: string): boolean {
    const aspectRatio = this.imageAspectRatios[img] || 1;
    return aspectRatio > 1.2;
  }

  // Mouse drag handlers
  onMouseDown(event: MouseEvent) {
    if (this.scale <= 1) return;

    this.isDragging = true;
    this.startX = event.clientX - this.prevTranslateX;
    this.startY = event.clientY - this.prevTranslateY;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || this.scale <= 1) return;

    this.translateX = event.clientX - this.startX;
    this.translateY = event.clientY - this.startY;
  }

  onMouseUp() {
    this.isDragging = false;
    this.prevTranslateX = this.translateX;
    this.prevTranslateY = this.translateY;
  }

  onMouseLeave() {
    this.isDragging = false;
  }

  // Touch handlers for mobile
  onTouchStart(event: TouchEvent) {
    if (this.scale <= 1) return;

    this.isDragging = true;
    this.startX = event.touches[0].clientX - this.prevTranslateX;
    this.startY = event.touches[0].clientY - this.prevTranslateY;
    event.preventDefault();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || this.scale <= 1) return;

    this.translateX = event.touches[0].clientX - this.startX;
    this.translateY = event.touches[0].clientY - this.startY;
    event.preventDefault();
  }

  onTouchEnd() {
    this.isDragging = false;
    this.prevTranslateX = this.translateX;
    this.prevTranslateY = this.translateY;
  }

  // Keyboard shortcuts
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.lightboxActive) return;

    switch(event.key) {
      case 'ArrowRight':
        if (this.scale <= 1) this.nextImage();
        break;
      case 'ArrowLeft':
        if (this.scale <= 1) this.prevImage();
        break;
      case 'Escape':
        this.closeLightbox();
        break;
      case '+':
      case '=':
        if (event.ctrlKey || event.metaKey) this.zoomIn();
        break;
      case '-':
        if (event.ctrlKey || event.metaKey) this.zoomOut();
        break;
      case '0':
        if (event.ctrlKey || event.metaKey) this.resetZoom();
        break;
    }
  }
}
