interface MediaDetails {
  width: number;
  height: number;
  sizes?: {
    height: number;
    width: number;
    sourceUrl: string;
  }[];
}

interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: MediaDetails;
  };
}

declare interface PageItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: MediaDetails;
    };
  };
}

declare interface PostItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      avatar: {
        url: string;
      };
      email: string;
      name: string;
    };
  };
  content: string;
  featuredImage: FeaturedImage;
}

declare interface CardProps {
  imageSrc: string;
  heading: string;
  excerpt: string;
  href: string;
  date: string;
  height: number;
  width: number;
}
