export const getGifs = async (category) => {
  // const url = `https://api.giphy.com/v1/gifs/search?api_key=1ks79v1Yz5f77a9NOU87OhWO7hi7O0ct&q=${category}&limit=20`;
const url = `https://tenor.googleapis.com/v2/search?q=${category}&key=AIzaSyDVr1vPYKzqamdMI4LG7-y3WtfyQSD911s&client_key=my_test_app&limit=20`
  const res = await fetch(url);
  const { results } = await res.json();

  const gifs = results.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.media_formats.gif.url,
  }));
  return gifs;
};
