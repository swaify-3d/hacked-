window.onload = function() {
  // Elements
  const output = document.getElementById('output');
  const enterPortfolioBtn = document.getElementById('enterPortfolioBtn');
  const backBtn = document.getElementById('backBtn');
  const terminalDiv = document.getElementById('terminal');
  const portfolioDiv = document.getElementById('portfolio');
  const commandInput = document.getElementById('commandInput');

  // User info for commands and about me
  const userInfo = {
    name: "swaify",
    about:
      "I'm swaify.\n" +
      "I model and build in Blender, and build for Roblox Studio.\n" +
      "I create animations and digital art using Adobe Photoshop, Illustrator, and Adobe Substance Painter.\n" +
      "I'm edgy and I break the rules.",
    projects: "No projects in portfolio yet.",
    contact: [
      "Discord: swaify1",
      "Roblox: swaify, mrprosayf, Superloloa"
    ],
  };

  // Info lines to display on init
  const infoLines = [
    `IP Address: 192.168.1.1`,
    `Browser: ${navigator.userAgent}`,
    `Platform: ${navigator.platform}`,
    `Language: ${navigator.language}`,
    `Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`,
    `Online: ${navigator.onLine ? 'Yes' : 'No'}`,
  ];

  let currentLine = 0;

  function typeLine(line, callback) {
    let i = 0;
    function typing() {
      if (i < line.length) {
        output.textContent += line.charAt(i);
        i++;
        setTimeout(typing, 30);
      } else {
        output.textContent += '\n';
        callback();
      }
    }
    typing();
  }

  function showInfoAnimated() {
    if (currentLine === 0) {
      output.textContent = 'Initializing...\n';
    }
    if (currentLine < infoLines.length) {
      typeLine(infoLines[currentLine], () => {
        currentLine++;
        showInfoAnimated();
      });
    } else {
      output.textContent += '\nInitialization complete.\nReady.\n\n';
      enterPortfolioBtn.style.display = 'inline-block';
      commandInput.style.display = 'block';
      commandInput.focus();
      printPrompt();
    }
  }

  // Command line stuff
  const commands = {
    help: () => {
      return (
        "Available commands:\n" +
        "help - Show this help text\n" +
        "whoami - Show your info\n" +
        "about - Show about me section\n" +
        "projects - Show projects section\n" +
        "contact - Show contact info\n" +
        "clear - Clear terminal\n" +
        "portfolio - Go to portfolio page\n" +
        "exit - Back to terminal from portfolio"
      );
    },
    whoami: () => {
      return (
        `Name: ${userInfo.name}\n` +
        `Browser: ${navigator.userAgent}\n` +
        `Platform: ${navigator.platform}\n` +
        `Language: ${navigator.language}`
      );
    },
    about: () => userInfo.about,
    projects: () => userInfo.projects,
    contact: () => userInfo.contact.join('\n'),
    clear: () => {
      output.textContent = "";
      return "";
    },
    portfolio: () => {
      terminalDiv.style.display = 'none';
      portfolioDiv.style.display = 'block';
      return "";
    },
    exit: () => {
      portfolioDiv.style.display = 'none';
      terminalDiv.style.display = 'block';
      commandInput.style.display = 'block';
      commandInput.focus();
      return "";
    }
  };

  function processCommand(input) {
    const cmd = input.trim().toLowerCase();
    if (commands[cmd]) {
      return commands[cmd]();
    } else {
      return `Command not found: ${cmd}`;
    }
  }

  // Print prompt
  function printPrompt() {
    output.textContent += '> ';
  }

  // Handle input
  commandInput.style.display = 'none'; // hide initially
  commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const input = commandInput.value;
      output.textContent += '> ' + input + '\n';
      const result = processCommand(input);
      if (result) {
        output.textContent += result + '\n';
      }
      commandInput.value = '';
      printPrompt();
      output.scrollTop = output.scrollHeight;
    }
  });

  // Button handlers
  enterPortfolioBtn.style.display = 'none';
  enterPortfolioBtn.addEventListener('click', () => {
    commands.portfolio();
  });

  backBtn.addEventListener('click', () => {
    commands.exit();
  });

  showInfoAnimated();
};
