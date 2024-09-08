import { mapMeetupsToCards } from "./mapMeetupsToCards";
import { mapPostsToCards } from "./mapPostsToCards";

const batchedData = await fetch(`${import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      query BatchedQueries (
        $meetupName: String!
        $blogName: String!
      ) {
          meetupPosts: posts(where: {categoryName: $meetupName}) {
            nodes {
              id: databaseId
              slug
              title(format: RENDERED)
              excerpt
              eventSettings {
                eventDate
              }
              featuredImage {
                node {
                  mediaDetails {
                    sizes(include: MEDIUM) {
                      height
                      width
                      sourceUrl
                    }
                  }
                }
              }
            }
          }

          blogPosts: posts(where: {categoryName: $blogName}) {
            nodes {
              id: databaseId
              slug
              title(format: RENDERED)
              excerpt
              date
              featuredImage {
                node {
                  mediaDetails {
                    sizes(include: MEDIUM) {
                      height
                      width
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        }
    `,
    variables: {
      blogName: "blog",
      meetupName: "meetups",
    },
  }),
});

const { data } = await batchedData.json();

export const meetupPosts = data.meetupPosts.nodes;
export const meetupCards = mapMeetupsToCards(meetupPosts);

export const blogPosts = data.blogPosts.nodes;
export const blogCards = mapPostsToCards(blogPosts);

export const fetchPostData = async (slug: string) => {
  const response = await fetch(`${import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query fetchPost {
          post(id: "${slug}", idType: SLUG) {
            author {
              node {
                avatar {
                  url
                }
                email
                name
              }
            }
            content(format: RENDERED)
            featuredImage {
              node {
                altText
                sourceUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            title(format: RENDERED)
          }
        }
      `,
    }),
  });

  // Await and return the JSON response
  const result = await response.json();
  return result.data.post;
};

export const fetchPageData = async (slug: string) => {
  const response = await fetch(`${import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query fetchPage{
          page(id: "/${slug}/", idType: URI) {
            title
            content(format: RENDERED)
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      `,
    }),
  });

  // Await and return the JSON response
  const result = await response.json();
  return result.data.page;
};
