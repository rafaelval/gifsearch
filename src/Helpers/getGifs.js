export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=1ks79v1Yz5f77a9NOU87OhWO7hi7O0ct&q=${category}&limit=20`;
  const res = await fetch(url);
  const { data } = await res.json();

  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  return gifs;
};
