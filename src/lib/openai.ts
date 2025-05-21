import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePlaylistDescription(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a music expert who helps create Spotify playlists. Generate engaging and descriptive playlist descriptions based on user prompts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating playlist description:", error);
    throw error;
  }
}

export async function suggestSimilarArtists(
  artists: string[],
  count: number = 5
): Promise<string[]> {
  try {
    const artistList = artists.join(", ");
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a music expert. Given a list of artists, suggest similar artists that fans might enjoy. Return only the artist names, separated by commas.",
        },
        {
          role: "user",
          content: `Suggest ${count} artists similar to: ${artistList}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const suggestions =
      response.choices[0]?.message?.content?.split(",").map((a) => a.trim()) || [];
    return suggestions;
  } catch (error) {
    console.error("Error suggesting similar artists:", error);
    throw error;
  }
}

export async function generatePlaylistFromDescription(
  description: string,
  count: number = 20
): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a music expert. Given a playlist description, suggest specific songs that would fit well in the playlist. Return only the song names and artists in the format 'Artist - Song', separated by commas.",
        },
        {
          role: "user",
          content: `Suggest ${count} songs for a playlist with this description: ${description}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const suggestions =
      response.choices[0]?.message?.content?.split(",").map((s) => s.trim()) || [];
    return suggestions;
  } catch (error) {
    console.error("Error generating playlist suggestions:", error);
    throw error;
  }
} 