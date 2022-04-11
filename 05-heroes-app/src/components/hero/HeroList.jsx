import { useMemo } from 'react';

import { getHeroesByPublisher } from '../../services/heroes.service';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [ publisher ]);

  return (
    <div className='row row-cols-1 row-cols-md-3 animate__animated animate__fadeIn'>
      {
        heroes.map((hero) => (
          <HeroCard key={ hero.id }
                    { ...hero }/>
        ))
      }
    </div>
  )
}
