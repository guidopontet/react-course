export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI(category) }&limit=10&api_key=UWO8nbIaWbmcMJ2xKW593vAxEccrAhYJ`;
  const resp = await fetch(url);
  const { data } = await resp.json();

  return data.map((img) => {
    return {
      id: img.id,
      title: img.title,
      url: img.images.downsized_medium.url,
    }
  });
};
