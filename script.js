const output = document.getElementById('output');
const enterPortfolioBtn = document.getElementById('enterPortfolioBtn');
const backBtn = document.getElementById('backBtn');
const terminalDiv = document.getElementById('terminal');
const portfolioDiv = document.getElementById('portfolio');

const infoLines = [
  `IP Address: ${getIP()}`,
  `Browser: ${navigator.userAgent}`,
  `Platform: ${navigator.platform}`,
  `Language: ${navigator.language}`,
  `Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`,
  `Online: ${navigator.onLine ? 'Yes' : 'No'}`,
];

function getIP() {
  // Placeholder IP address; replace with real API if needed
  return '192.168.1.1';
}

let currentLine = 0;

function showInfo() {
  if (currentLine === 0) {
    output.textContent = 'Initializing...'; // reset output on first run
  }

  if (currentLine < infoLines.length) {
    output.textContent += '\n' + infoLines[currentLine];
    currentLine++;
    setTimeout(showInfo, 1000);
  } else {
    output.textContent += '\n\nInitialization complete.\nReady.';
    enterPortfolioBtn.style.display = 'inline-block';
  }
}

// Hide the button at start
enterPortfolioBtn.style.display = 'none';

// Start the info display
showInfo();

enterPortfolioBtn.addEventListener('click', () => {
  terminalDiv.style.display = 'none';
  portfolioDiv.style.display = 'block';
});

backBtn.addEventListener('click', () => {
  portfolioDiv.style.display = 'none';
  terminalDiv.style.display = 'block';
});
