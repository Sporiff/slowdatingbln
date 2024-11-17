export class CarouselController {
   private carouselId: string;
   private carousel: HTMLElement | null;
   private prevBtn: HTMLElement | null;
   private nextBtn: HTMLElement | null;
   private cardCount: number;
   private cardWidth: number;
   private currentIndex: number;
   private visibleCards: number;

   constructor(id: string) {
      this.carouselId = id;
      this.carousel = document.getElementById(`${id}-track`);
      this.prevBtn = document.getElementById(`${id}-prevBtn`);
      this.nextBtn = document.getElementById(`${id}-nextBtn`);

      this.cardCount = this.carousel
         ? Number(this.carousel.dataset["cards"] || 0)
         : 0;
      this.cardWidth = this.carousel?.firstElementChild
         ? (this.carousel.firstElementChild as HTMLElement).clientWidth
         : 0;
      this.currentIndex = 0;
      this.visibleCards = 1;

      this.init();
   }

   /**
    * Initializes event listeners and sets initial state
    */
   private init(): void {
      if (!this.carousel || !this.prevBtn || !this.nextBtn) {
         console.warn(
            `Carousel with id ${this.carouselId} is missing required elements.`,
         );
         return;
      }

      globalThis.addEventListener("resize", () => this.updateDimensions());
      this.prevBtn.addEventListener("click", () => this.moveCarousel(-1));
      this.nextBtn.addEventListener("click", () => this.moveCarousel(1));
      this.updateDimensions();
      this.updateButtons();
   }

   /**
    * Updates the dimensions and visible card count on window resize
    */
   private updateDimensions(): void {
      if (!this.carousel) return;

      const firstCard = this.carousel.firstElementChild as HTMLElement | null;
      this.cardWidth = firstCard ? firstCard.clientWidth : 0;
      this.visibleCards = Math.floor(
         this.carousel.clientWidth / this.cardWidth,
      );
      this.updateButtons();
   }

   /**
    * Moves the carousel by a specified number of cards
    * @param direction - Positive for moving forward, negative for moving backward
    */
   private moveCarousel(direction: number): void {
      if (!this.carousel) return;

      const newIndex = this.currentIndex + direction;
      if (newIndex >= 0 && newIndex <= this.cardCount - this.visibleCards) {
         this.currentIndex = newIndex;
         this.carousel.style.transform = `translateX(-${
            this.currentIndex * this.cardWidth
         }px)`;
         this.updateButtons();
      }
   }

   /**
    * Updates the visibility of the prev/next buttons
    */
   private updateButtons(): void {
      if (!this.prevBtn || !this.nextBtn) return;

      this.prevBtn.classList.toggle("hidden", this.currentIndex === 0);
      this.nextBtn.classList.toggle(
         "hidden",
         this.currentIndex >= this.cardCount - this.visibleCards,
      );
   }
}
