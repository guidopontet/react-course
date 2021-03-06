import React, { useState } from 'react'

import GifGrid from './GifGrid';
import AddCategory from './AddCategory';

function GifExperApp({ defaultCategories = [] }) {
  const [categories, setCategories] = useState(defaultCategories);

  return (
    <>
      <h2>GifExperApp</h2>
      <AddCategory setCategories={ setCategories } />

      <hr />

      <ol>
        {
          categories.map((category) => (
            <GifGrid key={ category }
                     category={ category } />
          ))
        }
      </ol>
    </>
  )
}

export default GifExperApp