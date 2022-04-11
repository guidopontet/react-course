import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import queryString from "query-string";

import useForm from "../../hooks/useForm";
import { getHeroeByName } from "../../services/heroes.service";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q: query = '' } = queryString.parse(location.search);

  const [{ searchText }, handleSearchTextChange] = useForm({ searchText: query});

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`?q=${ searchText }`);
  }

  const heroesFiltered = useMemo(() => getHeroeByName(query), [ query ]);

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={ handleSubmit }>
            <input type="text"
                   name="searchText"
                   placeholder="Buscar un héroe"
                   className="form-control"
                   autoComplete="off"
                   value={ searchText }
                   onChange={ handleSearchTextChange }/>

            <button type="submit"
                    className="btn btn-outline-primary mt-3 w-100">
              Buscar
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {
            (query === '')
              ? <div className="alert alert-info">Buscar un héroe</div>
              : ( heroesFiltered.length === 0 )
                && <div className="alert alert-danger">No hay resultados: { query }</div>
          }

          {
            heroesFiltered.map((hero) => (
              <HeroCard key={ hero.id }
                        { ...hero }/>
            ))
          }
        </div>
      </div>
    </>
  )
}
