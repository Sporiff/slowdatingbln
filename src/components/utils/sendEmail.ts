export const sendEmail = async (email: string) => {
  try {
    const response = await fetch(`${import.meta.env.PUBLIC_GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            sendEmail(
              input: {
                to: "${import.meta.env.PUBLIC_EMAIL}"
                from: "noreply@slowdatingbln.com"
                subject: "New signup for Slow Dating Berlin"
                body: "${email} wants to sign up for the Slow Dating Berlin newsletter"
                clientMutationId: "${email}"
              }
            ) {
              sent
              message
            }
          }
        `,
      }),
    });

    const result = await response.json();
    const { message } = result.data.sendEmail;
    return { status: "success", message };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { status: "error", message: "Error submitting form" };
  }
};
