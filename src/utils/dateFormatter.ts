/**
 * Converts a date string to a localized date string in 'en-GB' format
 * @param date The date string
 */
export function postDateToDateString(date: string): string {
   const dateString = new Date(date);
   return dateString.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
   });
}

/**
 * Extracts and formats a date from a response object
 * @param response The response body to be formatted
 */
export function extractDate<T extends MeetupResponse | PostResponse>(
   response: T,
): string {
   if ("eventSettings" in response && response.eventSettings?.eventDate) {
      return postDateToDateString(response.eventSettings.eventDate);
   }
   if ("date" in response && response.date) {
      return postDateToDateString(response.date);
   }
   return "";
}
