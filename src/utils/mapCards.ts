type ResponseWithDateField = { eventSettings?: { eventDate?: string } } | {
   date?: string;
};

export const postDateToDateString = (date: string) => {
   const dateString = new Date(date);

   return dateString.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
   });
};

const extractDate = (response: ResponseWithDateField): string => {
   const date = "eventSettings" in response
      ? response.eventSettings?.eventDate
      : "date" in response
      ? response.date
      : undefined;

   return date ? postDateToDateString(date) : "";
};

const mapResponseToCards = <T extends ApiResponseBase>(
   apiResponse: T[],
   hrefPrefix: string,
   getDate: (response: T) => string,
): CardProps[] => {
   return apiResponse.map((response) => ({
      heading: response.title,
      excerpt: response.excerpt,
      href: `${hrefPrefix}/${response.slug}`,
      date: getDate(response),
      imageSrc: response.featuredImage.node.mediaDetails.sizes[0].sourceUrl ??
         "",
      height: response.featuredImage.node.mediaDetails.sizes[0].height ?? 0,
      width: response.featuredImage.node.mediaDetails.sizes[0].width ?? 0,
   }));
};

export const mapMeetupsToCards = (
   apiResponse: MeetupResponse[],
): CardProps[] => {
   if (!apiResponse) {
      throw new Error("No response data found");
   }
   return mapResponseToCards(apiResponse, "/events", extractDate);
};

export const mapPostsToCards = (apiResponse: PostResponse[]): CardProps[] => {
   if (!apiResponse) {
      throw new Error("No response data found");
   }
   return mapResponseToCards(apiResponse, "/blog", extractDate);
};
