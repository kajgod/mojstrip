import episodes from "../data/episodes.json";

export const getEpisode = (id: number = episodes.length) => {
  return episodes.find((episode) => episode.id === id);
};
