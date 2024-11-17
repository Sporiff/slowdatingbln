export class CardMapper<T extends ApiResponseBase> {
   private hrefPrefix: string;
   private getDate: (response: T) => string;

   constructor(hrefPrefix: string, getDate: (response: T) => string) {
      this.hrefPrefix = hrefPrefix;
      this.getDate = getDate;
   }

   /**
    * Maps a list of API responses to an array of CardProps
    * @param apiResponse - The API response array to map
    * @returns - An array of CardProps objects
    */
   public mapResponseToCards(apiResponse: T[]): CardProps[] {
      return apiResponse.map((response) => ({
         heading: response.title,
         excerpt: response.excerpt,
         href: `${this.hrefPrefix}/${response.slug}`,
         date: this.getDate(response),
         imageSrc:
            response.featuredImage.node.mediaDetails.sizes[0].sourceUrl ?? "",
         height: response.featuredImage.node.mediaDetails.sizes[0].height ?? 0,
         width: response.featuredImage.node.mediaDetails.sizes[0].width ?? 0,
      }));
   }
}
