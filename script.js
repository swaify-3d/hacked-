window.onload = function() {
  const output = document.getElementById('output');
  const enterPortfolioBtn = document.getElementById('enterPortfolioBtn');
  const backBtn = document.getElementById('backBtn');
  const terminalDiv = document.getElementById('terminal');
  const portfolioDiv = document.getElementById('portfolio');

  const infoLines = [
    `IP Address: 192.168.1.1`,
    `Browser: ${navigator.userAgent}`,
    `Platform: ${navigator.platform}`,
    `Language: ${navigator.language}`,
    `Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`,
    `Online: ${navigator.onLine ? 'Yes' : 'No'}`,
  ];

  let currentLine = 0;

  function showInfo() {
    if (currentLine === 0) {
      output.textContent = 'Initializing...';
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

  enterPortfolioBtn.style.display = 'none';

  showInfo();

  enterPortfolioBtn.addEventListener('click', () => {
    terminalDiv.style.display = 'none';
    portfolioDiv.style.display = 'block';
  });

  backBtn.addEventListener('click', () => {
    portfolioDiv.style.display = 'none';
    terminalDiv.style.display = 'block';
  });
};
