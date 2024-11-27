import { extractDate } from "./dateFormatter.ts";

// Factory function to create a card mapping function
export function createCardMapper<T extends ApiResponseBase>(
   hrefPrefix: string,
) {
   return (apiResponse: T[]): CardProps[] => {
      return apiResponse.map((response) => ({
         heading: response.title,
         excerpt: response.excerpt,
         href: `${hrefPrefix}/${response.slug}`,
         date: extractDate(response),
         imageSrc:
            response.featuredImage.node.mediaDetails.sizes[0].sourceUrl ?? "",
         height: response.featuredImage.node.mediaDetails.sizes[0].height ?? 0,
         width: response.featuredImage.node.mediaDetails.sizes[0].width ?? 0,
      }));
   };
}
