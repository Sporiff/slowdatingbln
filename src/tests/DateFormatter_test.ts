// @deno-types="../declarations.d.ts"

import { assertEquals } from "jsr:@std/assert";
import { DateFormatter } from "../utils/DateFormatter.ts";
import { dummyDate, dummyMeetup, dummyPost, expectedDate } from "./testData.ts";

Deno.test("test date mapping", () => {
   assertEquals(DateFormatter.postDateToDateString(dummyDate), expectedDate);
});

Deno.test("test blog post date extraction", () => {
   assertEquals(DateFormatter.extractDate(dummyPost), expectedDate);
});

Deno.test("test meetup date extraction", () => {
   assertEquals(DateFormatter.extractDate(dummyMeetup), expectedDate);
});
