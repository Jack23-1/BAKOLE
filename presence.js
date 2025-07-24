// Coordonnées GPS précises fournies
const UPN_LAT = -4.4027213;
const UPN_LNG = 15.2590099;
const MAX_DISTANCE_METERS = 300;  // ajuste selon besoin

// Calcul distance entre deux points GPS en mètres (formule haversine)
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Rayon Terre en mètres
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Afficher message avec style Bootstrap selon type (success, danger, warning)
function afficherMessage(texte, type = "success") {
  const msg = document.getElementById("message");
  msg.innerText = texte;
  msg.className = `alert alert-${type}`;
  msg.style.display = "block";
}

// Simulation du scan d'empreinte digitale (à remplacer par vraie vérification)
function scannerEmpreinte() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });
}

async function verifierPresence() {
  const bouton = document.querySelector(".btn-pointage");
  const msg = document.getElementById("message");
  const positionAff = document.getElementById("position-actuelle");
  const distanceAff = document.getElementById("distance-actuelle");
  msg.style.display = "none";
  positionAff.innerText = "";
  distanceAff.innerText = "";

  bouton.disabled = true;
  bouton.innerText = "Vérification...";

  if (!navigator.geolocation) {
    afficherMessage("🚫 La géolocalisation n'est pas supportée par ce navigateur.", "danger");
    bouton.disabled = false;
    bouton.innerText = "✅ Pointer ma présence";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Affichage position captée pour debug
    positionAff.innerText = `Position GPS actuelle : lat ${lat.toFixed(6)}, lng ${lng.toFixed(6)}`;

    const distance = getDistanceFromLatLonInMeters(lat, lng, UPN_LAT, UPN_LNG);
    distanceAff.innerText = `Distance au centre : ${Math.round(distance)} mètres`;

    if (distance > MAX_DISTANCE_METERS) {
      afficherMessage(`🚫 Vous êtes hors de la zone autorisée (plus de ${MAX_DISTANCE_METERS} m).`, "warning");
      bouton.disabled = false;
      bouton.innerText = "✅ Pointer ma présence";
      return;
    }

    const empreinteOK = await scannerEmpreinte();

    if (empreinteOK) {
      afficherMessage("✅ Votre présence a été enregistrée avec succès !", "success");
      bouton.innerText = "Présence confirmée";
    } else {
      afficherMessage("🚫 Échec de la vérification d'empreinte.", "danger");
      bouton.disabled = false;
      bouton.innerText = "✅ Pointer ma présence";
    }

  }, () => {
    afficherMessage("🚫 Impossible d’obtenir votre position GPS.", "danger");
    bouton.disabled = false;
    bouton.innerText = "✅ Pointer ma présence";
  });
}
