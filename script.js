async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (e) {
    return "Unable to fetch IP";
  }
}

function getDeviceInfo() {
  return {
    browser: navigator.userAgent,
    os: navigator.platform,
    resolution: `${window.screen.width}x${window.screen.height}`,
  };
}

async function printInfo() {
  const output = document.getElementById("output");
  const ip = await getIP();
  const info = getDeviceInfo();

  const lines = [
    "[+] Accessing system...",
    `[+] IP Address: ${ip}`,
    `[+] Operating System: ${info.os}`,
    `[+] Browser: ${info.browser}`,
    `[+] Screen Resolution: ${info.resolution}`,
    "[+] Tracking enabled... Just kidding 😅",
    "[+] Loading personal portfolio...",
    "Press the button to continue."
  ];

  for (let line of lines) {
    await new Promise(r => setTimeout(r, 800));
    output.textContent += "\n" + line;
  }
}

function showPortfolio() {
  window.location.href = "portfolio.html"; // You can create this page next
}

printInfo();
