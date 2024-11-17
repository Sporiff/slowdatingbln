// @deno-types="../declarations.d.ts"

import { assertEquals } from "jsr:@std/assert";
import { DateFormatter } from "../utils/DateFormatter.ts";
import { CardMapper } from "../utils/CardMapper.ts";
import {
   dummyMeetup,
   dummyPost,
   expectedMeetup,
   expectedPost,
} from "./testData.ts";

Deno.test("test meetup card mapping", () => {
   const meetupCardMapper = new CardMapper(
      "/events",
      DateFormatter.extractDate,
   );
   const mappedMeetup = meetupCardMapper.mapResponseToCards([dummyMeetup]);
   assertEquals(mappedMeetup, [expectedMeetup]);
});

Deno.test("test post card mapping", () => {
   const postCardMapper = new CardMapper("/blog", DateFormatter.extractDate);
   const mappedPost = postCardMapper.mapResponseToCards([dummyPost]);
   assertEquals(mappedPost, [expectedPost]);
});
