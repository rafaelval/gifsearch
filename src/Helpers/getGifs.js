export const getGifs = async (category) => {
  const baseUrl = process.env.REACT_APP_URL
  const apiKey = process.env.REACT_APP_APIKEY;
  const url = `${baseUrl}search?q=${category}&key=${apiKey}&client_key=my_test_app&limit=50`;
  const res = await fetch(url);
  const { results } = await res.json();

  if (!results) {
    return [];
  }

  const gifs = results.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.media_formats.gif.url,
    description: img.content_description
  }));
  return gifs;
};
