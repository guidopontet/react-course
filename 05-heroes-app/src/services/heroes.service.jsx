import { heroes } from '../data/heroes';

const getHeroeById = (id) => {
  return heroes.find((hero) => hero.id === id);
};

const getHeroesByName = (name = '') => {
  if (!name) return [];

  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name.toLowerCase()));
};

const getHeroesByPublisher = (publisher) => {
  return heroes.filter((hero) => hero.publisher === publisher);
};

export {
  getHeroeById,
  getHeroesByName as getHeroeByName,
  getHeroesByPublisher,
}