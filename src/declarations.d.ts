type MediaDetails = {
  width: number;
  height: number;
  sizes?: {
    height: number;
    width: number;
    sourceUrl: string;
  }[];
};

type FeaturedImage = {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
      sizes?: {
        height: number;
        width: number;
        sourceUrl: string;
      }[];
    };
  };
};

declare type PageItem = {
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
};

declare type PostItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
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
};

declare type CardProps = {
  imageSrc: string;
  heading: string;
  excerpt: string;
  href: string;
  date: string;
  height: number;
  width: number;
};

interface ApiResponseBase {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author?: {
    node: {
      avatar: {
        url: string;
      };
      email: string;
      name: string;
    };
  };
  featuredImage: {
    node: {
      altText?: string;
      sourceUrl?: string;
      mediaDetails: {
        width?: number;
        height?: number;
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

declare interface MeetupResponse extends ApiResponseBase {
  eventSettings?: {
    eventDate?: string;
  };
}

declare interface PostResponse extends ApiResponseBase {
  date?: string;
}
