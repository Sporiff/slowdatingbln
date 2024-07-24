import { postDateToDateString } from "./postDateToDateString";

interface ApiResponse {
  id: number;
  slug: string;
  title: string;
  eventSettings?: {
    eventDate?: string;
  };
  featuredImage: {
    node: {
      mediaDetails: {
        sizes: [
          {
            height: number;
            width: number;
            sourceUrl: string;
          },
        ];
      };
    };
  };
}

export const mapMeetupsToCards = (apiResponse: ApiResponse[]): CardProps[] => {
  return apiResponse.map((response) => ({
    heading: response.title,
    body: response.title,
    href: `/events/${response.slug}`,
    date: response.eventSettings?.eventDate
      ? postDateToDateString(response.eventSettings!.eventDate)
      : "",
    imageSrc: response.featuredImage.node.mediaDetails.sizes[0].sourceUrl
      ? response.featuredImage.node.mediaDetails.sizes[0].sourceUrl
      : "",
    height: response.featuredImage.node.mediaDetails.sizes[0].height,
    width: response.featuredImage.node.mediaDetails.sizes[0].width,
  }));
};
