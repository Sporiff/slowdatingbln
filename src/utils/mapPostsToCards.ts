import { postDateToDateString } from "./postDateToDateString";

export const mapPostsToCards = (apiResponse: PostItem[]): CardProps[] => {
  return apiResponse.map((response) => ({
    heading: response.title,
    excerpt: response.excerpt,
    href: `/blog/${response.slug}`,
    date: response.date ? postDateToDateString(response.date) : "",
    imageSrc: response.featuredImage.node.mediaDetails.sizes![0].sourceUrl
      ? response.featuredImage.node.mediaDetails.sizes![0].sourceUrl
      : "",
    height: response.featuredImage.node.mediaDetails.sizes![0].height,
    width: response.featuredImage.node.mediaDetails.sizes![0].width,
  }));
};
