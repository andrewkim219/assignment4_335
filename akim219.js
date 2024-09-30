const bodyLogo = document.getElementById("bodyLogo");

async function fetchLogo () {
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/Logo");
    const data = await response.blob();
    bodyLogo.src = URL.createObjectURL(data);
}

fetchLogo();