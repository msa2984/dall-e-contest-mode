const apiPrefix = "http://localhost:5000";

export async function getImageFromPrompt(prompt: string): Promise<string | null> {
  try {
    const url = apiPrefix.concat("/api/create");
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user_input: prompt,
      }),
    });

    if (response.ok) {
      return await response.text();
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
