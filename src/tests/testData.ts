export const dummyMeetup: MeetupResponse = {
   id: 1,
   slug: "test-meetup",
   title: "Test meetup",
   excerpt: "<p>A test meetup</p>\n",
   eventSettings: { eventDate: "2024-12-05T19:30:00+00:00" },
   content: "Some content",
   author: {
      node: {
         avatar: {
            url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
         },
         email: "joebloggs@ema.il",
         name: "Joe Bloggs",
      },
   },
   featuredImage: {
      node: {
         altText: "",
         sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
         mediaDetails: {
            width: 1080,
            height: 1080,
            sizes: [{
               height: 300,
               width: 300,
               sourceUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
            }],
         },
      },
   },
};

export const expectedMeetup: CardProps = {
   heading: "Test meetup",
   excerpt: "<p>A test meetup</p>\n",
   href: "/events/test-meetup",
   date: "Thu 5 December 2024",
   imageSrc: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
   height: 300,
   width: 300,
};

export const dummyPost: PostResponse = {
   id: 2,
   slug: "test-blog-post",
   title: "Test blog post",
   excerpt: "<p>A test blog post</p>\n",
   date: "2024-12-05T19:30:00+00:00",
   content: "Some content",
   author: {
      node: {
         avatar: {
            url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
         },
         email: "joebloggs@ema.il",
         name: "Joe Bloggs",
      },
   },
   featuredImage: {
      node: {
         altText: "",
         sourceUrl:
            "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
         mediaDetails: {
            width: 1080,
            height: 1080,
            sizes: [{
               height: 300,
               width: 300,
               sourceUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
            }],
         },
      },
   },
};

export const expectedPost: CardProps = {
   heading: "Test blog post",
   excerpt: "<p>A test blog post</p>\n",
   href: "/blog/test-blog-post",
   date: "Thu 5 December 2024",
   imageSrc: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg",
   height: 300,
   width: 300,
};

export const dummyDate = "2024-12-05T19:30:00+00:00";
export const expectedDate = "Thu 5 December 2024";
