"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { generateRecipe } from "./actions"

export default function Home() {
  const [ingredient, setIngredient] = useState<string>("")
  const [ingredients, setIngredients] = useState<string[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [recipe, setRecipe] = useState<string>("")

  async function submit() {
    setLoading(true)
    const result = await generateRecipe(ingredients)
    setRecipe(result)
    setLoading(false)
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-4xl font-bold'>The Generator</h1>
        <p className='text-lg text-gray-500'>
          Generate unique recipes with ingredients you have on hand
        </p>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='text-2xl font-bold'>Ingredients</h2>
        <p className='text-lg text-gray-500'>Add ingredients you have on hand to get started</p>
        <div className='flex items-center gap-4 mt-4'>
          <input
            type='text'
            placeholder='Enter an ingredient'
            autoCorrect='off'
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className='px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A59] focus:border-transparent transition-all'
          />
          <button
            className='px-6 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#e66e50] transition-colors font-medium'
            onClick={() => {
              setIngredient("")
              setIngredients([...ingredients, ...ingredient.split(",").map((el) => el.trim())])
            }}
          >
            Add
          </button>
        </div>
        <ul className='flex gap-2 mt-4'>
          {ingredients.map((ingredient, index) => (
            <>
              <li key={index} className='px-4 py-2 border-[#FF7A59] border-2 text-[#FF7A59] rounded-lg'>
                {ingredient}
              </li>
            </>
          ))}
        </ul>
        {loading ? (
          <div className='mt-8 text-lg text-gray-500'>Generating your recipe...</div>
        ) : (
          <div className='flex gap-4 mt-10 border-t border-gray-200 pt-10'>
            <button
              className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
              onClick={() => {
                setIngredients([])
                setIngredient("")
                setRecipe("")
                setLoading(false)
              }}
            >
              Reset
            </button>
            <button
              className='px-6 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#e66e50] transition-colors font-medium'
              onClick={submit}
            >
              Generate
            </button>
          </div>
        )}
        {recipe && !loading && (
          <div className='mt-8 max-w-2xl'>
            <h2 className='text-2xl font-bold mb-4'>Your Recipe</h2>
            <div className='prose prose-invert'>
              <ReactMarkdown>{recipe}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
