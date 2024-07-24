import { postDateToDateString } from "./postDateToDateString";

interface ApiResponse {
  id: number;
  slug: string;
  title: string;
  date: string;
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

export const mapPostsToCards = (apiResponse: ApiResponse[]): CardProps[] => {
  return apiResponse.map((response) => ({
    heading: response.title,
    body: response.title,
    href: `/blog/${response.slug}`,
    date: response.date ? postDateToDateString(response.date) : "",
    imageSrc: response.featuredImage.node.mediaDetails.sizes[0].sourceUrl
      ? response.featuredImage.node.mediaDetails.sizes[0].sourceUrl
      : "",
    height: response.featuredImage.node.mediaDetails.sizes[0].height,
    width: response.featuredImage.node.mediaDetails.sizes[0].width,
  }));
};
