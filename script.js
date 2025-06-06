// Typing animation for each line
function typeLine(element, text, delay = 30) {
  return new Promise(resolve => {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }
    type();
  });
}

async function showInfoAnimated() {
  const browserEl = document.getElementById('line-browser');
  const ipEl = document.getElementById('line-ip');
  const osEl = document.getElementById('line-os');

  await typeLine(browserEl, 'Browser: ' + navigator.userAgent);

  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    await typeLine(ipEl, 'IP: ' + data.ip);
  } catch {
    await typeLine(ipEl, 'IP: Unavailable');
  }

  await typeLine(osEl, 'OS: ' + navigator.platform);

  // Show the Enter Portfolio button after typing finishes
  document.getElementById('enterBtn').style.display = 'inline-block';
}

function showPortfolio() {
  alert("Portfolio section not implemented yet."); 
  // Replace with your portfolio code
}

window.onload = () => {
  showInfoAnimated();
};
