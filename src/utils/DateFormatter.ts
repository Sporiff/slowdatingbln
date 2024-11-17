export class DateFormatter {
   /**
    * Converts a date string to a localized date string in 'en-GB' format
    * @param date - A date string
    * @returns - A formatted date string
    */
   public static postDateToDateString(date: string): string {
      const dateString = new Date(date);
      return dateString.toLocaleDateString("en-GB", {
         weekday: "short",
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   }

   /**
    * Extracts a date from a response object and formats it using `postDateToDateString`
    * @param response - The response object containing the date information
    * @returns - A formatted date string or an empty string if no date is found
    */
   static extractDate<T extends MeetupResponse | PostResponse>(
      response: T,
   ): string {
      if ("eventSettings" in response && response.eventSettings?.eventDate) {
         return DateFormatter.postDateToDateString(
            response.eventSettings.eventDate,
         );
      }
      if ("date" in response && response.date) {
         return DateFormatter.postDateToDateString(response.date);
      }
      return "";
   }
}
