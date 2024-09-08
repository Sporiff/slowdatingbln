import { mapMeetupsToCards } from "./mapMeetupsToCards";
import { mapPostsToCards } from "./mapPostsToCards";

const batchedData = await fetch(`${import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      query BatchedQueries($meetupName: String!, $blogName: String!) {
        meetupPosts: posts(where: {categoryName: $meetupName}) {
          nodes {
            id: databaseId
            slug
            title(format: RENDERED)
            excerpt
            eventSettings {
              eventDate
            }
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
        pages: pages {
          nodes {
            id: databaseId
            slug
            title(format: RENDERED)
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
export const pages = data.pages.nodes;
