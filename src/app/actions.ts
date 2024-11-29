"use server"

export async function generateRecipe(ingredients: string[]) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful chef that creates unique recipes based on available ingredients.",
        },
        {
          role: "user",
          content: `Create a unique recipe using some or all of these ingredients: ${ingredients.join(
            ", "
          )}. Include a title, ingredients list with measurements, and step-by-step instructions. 
          If you use any ingredients that are not listed, please list them at the top under "Grocery List"
          Please add a section for Nutrition Facts. 
          Also add a section at the bottom for a recommendation for a cake that would pair well with it. Please write in-depth instructions for the cake recipe.`,
        },
      ],
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    console.error("OpenAI API error:", response.status, await response.text())
    throw new Error("Failed to generate recipe")
  }

  const data = await response.json()
  return data.choices[0].message.content
}
