import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getPokemons } from "./store/slices/pokemon";

export const PokemonApp = () => {
  const { isLoading, page, pokemons = [] } = useSelector((state) => state.pokemons)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [])

  return (
    <>
      <h1>PokemonApp</h1>
      <hr />
      <span>Loading: { isLoading ? 'true' : 'false' }</span>

      <ul>
        {
          pokemons.map((pokemon) => (
            <li key={ pokemon.name }>{ pokemon.name }</li>
          ))
        }
      </ul>

      <button
        disabled={ isLoading }
        onClick={ () => dispatch(getPokemons(page)) }
      >Next</button>
    </>
  )
}
