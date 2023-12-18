const apiPrefix = "http://localhost:5000";

// A caller function for the /api/create endpoint
// Makes a request to DALL-E to create an image
// based on the user's prompt.
export async function getImageFromPrompt(prompt: string, email: string): Promise<string | null> {
  try {
    const url = apiPrefix.concat("/api/create");
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        email: email
      }),
    });

    if (response.ok) {
      return (await response.json()).generated_url;
    } else {
      console.error(
        `There was an error trying to generate an image! Error: ${response.statusText}`
      );
    }
  } catch (ex) {
    console.error(ex);
  }
  return null;
}

// A caller function for the /api/submit endpoint. 
// Submits the user's current image to the contest.
export async function submitCurrentImage(prompt: string, imageUrl: string, email:string): Promise<boolean | null> {
  try {
    const url = apiPrefix.concat("/api/submit");
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        prompt: prompt,
        url: imageUrl,
        email: email
      }]),
    });

    if (response.ok) {
      return (await response.json()).message;
    } else {
      console.error(
        `There was an error trying to submit an image to the contest! Error: ${response.statusText}`
      );
    }
  } catch (ex) {
    console.error(ex);
  }
  return null;
}

// A caller function for the /api/vote endpoint. 
// Submits the user's votes in the contest.
export async function voteForImages(ids: string[], email: string): Promise<boolean | null> {
  try {
    const url = apiPrefix.concat("/api/vote");
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: ids,
        email: email
      }),
    });

    if (response.ok) {
      return (await response.json()).message;
    } else {
      console.error(
        `There was an error trying to vote in the contest! Error: ${response.statusText}`
      );
    }
  } catch (ex) {
    console.error(ex);
  }
  return null;
}

// A caller function for the /api/final-scores endpoint.
// Returns the top three submissions in order.
export async function getFinalScores(): Promise<any | null> {
  try {
    const url = apiPrefix.concat("/api/final-scores");
    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return (await response.json()).message;
    } else {
      console.error(
        `There was an error retrieving the final vote tally in the contest! Error: ${response.statusText}`
      );
    }
  } catch (ex) {
    console.error(ex);
  }
  return null;
}