
const BASE_URL = 'https://de1.api.radio-browser.info/json/stations';

export const radioApi = {
  getTopStations: async (limit = 20) => {
    try {
      const response = await fetch(`${BASE_URL}/topclick/${limit}`);
      if (!response.ok) throw new Error('Failed to fetch stations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching stations:', error);
      return [];
    }
  },

  searchStations: async (tag, limit = 20) => {
    try {
      const response = await fetch(`${BASE_URL}/bytag/${tag}?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch stations');
      return await response.json();
    } catch (error) {
      console.error('Error searching stations:', error);
      return [];
    }
  }
};
