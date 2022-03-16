import { useEffect, useState } from "react";

import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => { // Load component hook
    getGifs(category).then(
      (images) => {
        setTimeout(() => {
          setState({ data: images, loading: false })
        }, 1000);
      });
  }, [ category ]);

  return state;
};
