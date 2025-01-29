const API_URL = process.env.REACT_APP_GRAVCMS_API;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors du fetch:", error);
    return null;
  }
};
