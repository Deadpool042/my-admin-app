export const handleError = (error: any) => {
  if (error.response) {
    console.error("Erreur du serveur :", error.response.data);
    alert(`Erreur du serveur : ${error.response.data.message}`);
  } else if (error.request) {
    console.error("Erreur de réseau :", error.request);
  } else {
    console.error("Erreur inattendue :", error.message);
  }
};
