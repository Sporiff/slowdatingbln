export class MobileMenuToggle {
   private toggleButton: HTMLButtonElement;
   private closeButton: HTMLButtonElement;
   private mobileMenu: HTMLElement;

   constructor(
      toggleButtonId: string,
      closeButtonId: string,
      mobileMenuId: string,
   ) {
      const toggleButton = document.getElementById(
         toggleButtonId,
      ) as HTMLButtonElement;
      const closeButton = document.getElementById(
         closeButtonId,
      ) as HTMLButtonElement;
      const mobileMenu = document.getElementById(mobileMenuId);

      if (!toggleButton || !closeButton || !mobileMenu) {
         throw new Error(
            "One or more required elements are missing from the DOM.",
         );
      }

      this.toggleButton = toggleButton;
      this.closeButton = closeButton;
      this.mobileMenu = mobileMenu;

      this.addEventListeners();
   }

   private toggleMenu(): void {
      this.mobileMenu.classList.toggle("hidden");
   }

   private addEventListeners(): void {
      this.toggleButton.addEventListener("click", this.toggleMenu.bind(this));
      this.closeButton.addEventListener("click", this.toggleMenu.bind(this));
   }
}
