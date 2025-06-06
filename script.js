const output = document.getElementById('output');
const inputLine = document.querySelector('.input-line');
const input = document.getElementById('commandInput');

let visitorInfo = {
  ip: 'Loading...',
  browser: navigator.userAgent,
  platform: navigator.platform
};

// Fetch real IP from ipify API
fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    visitorInfo.ip = data.ip;
    startIntro();
  })
  .catch(() => {
    visitorInfo.ip = 'Unavailable';
    startIntro();
  });

function typeWriter(text, i = 0, callback) {
  if (i < text.length) {
    output.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 15);
  } else if (callback) {
    callback();
  }
}

function startIntro() {
  output.textContent = '';
  const introTexts = [
    'Initializing...\n\n',
    `Browser: ${visitorInfo.browser}\n`,
    `Platform: ${visitorInfo.platform}\n`,
    `IP: ${visitorInfo.ip}\n\n`,
    'Type "help" for commands.\n\n'
  ];

  let idx = 0;

  function nextLine() {
    if (idx < introTexts.length) {
      typeWriter(introTexts[idx], 0, () => {
        idx++;
        nextLine();
      });
    } else {
      // Show input line after intro finishes
      inputLine.style.display = 'flex';
      input.focus();
    }
  }

  nextLine();
}

const commands = {
  help: () => {
    return `Available commands:
- help
- about
- projects
- contact
- skills
- tools
- whoami
- socials
- clear
- exit
- echo <message>
- sudo
- login
- uptime
- motd
- nuke`;
  },
  about: () => {
    return `I'm swaify — a 3D modeler, builder, and Roblox game creator.
I model and build using Blender, Cinema4D, and Roblox Studio.
I create animations and texture assets using Adobe Photoshop, Illustrator, and Substance Painter.`;
  },
  projects: () => {
    return `No projects in portfolio yet.`;
  },
  contact: () => {
    return `Discord: swaify1
Roblox: swaify
Roblox alt: mrprosayf, Superloloa`;
  },
  skills: () => {
    return `Skills:
- 3D Modeling (Blender, Cinema4D)
- Roblox game development
- Animation creation
- Texturing and digital art`;
  },
  tools: () => {
    return `Tools I use:
- Blender
- Roblox Studio
- Cinema4D
- Adobe Photoshop
- Adobe Illustrator
- Substance Painter`;
  },
  whoami: () => {
    return `Browser: ${visitorInfo.browser}
Platform: ${visitorInfo.platform}
IP: ${visitorInfo.ip}`;
  },
  socials: () => {
    return `Discord: swaify1
Roblox: swaify
Other Roblox: mrprosayf, Superloloa`;
  },
  clear: () => {
    output.textContent = '';
    return '';
  },
  exit: () => {
    location.reload();
    return 'Reloading...';
  },
  echo: (args) => {
    return args.join(' ');
  },
  sudo: () => {
    return `Permission denied: You are not admin.`;
  },
  login: () => {
    return `Login failed: Incorrect credentials.`;
  },
  uptime: () => {
    return `System uptime: ${Math.floor(performance.now() / 1000)} seconds`;
  },
  motd: () => {
    return `Message of the Day:
"Stay curious. Break the rules."`;
  },
  nuke: () => {
    return `Nice try. No nukes here.`;
  }
};

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const rawInput = input.value.trim();
    if (!rawInput) return;

    printLine(`> ${rawInput}`);
    handleCommand(rawInput);
    input.value = '';
  }
});

function printLine(text) {
  output.textContent += text + '\n';
  output.scrollTop = output.scrollHeight;
}

function handleCommand(inputText) {
  const [cmd, ...args] = inputText.toLowerCase().split(' ');
  if (commands[cmd]) {
    const result = commands[cmd](args);
    if (result) printLine(result);
  } else {
    printLine(`Command not recognized: ${cmd}`);
  }
}
