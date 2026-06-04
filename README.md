# Sims Hub 🎮

A comprehensive desktop application for managing The Sims 4 mods with AI-powered troubleshooting.

## Features

✨ **Core Features:**
- 📁 Scan and organize Sims 4 mods folder
- 🔍 Detect duplicate package files
- 📊 Organize mods by creator and category
- 🖼️ Display CC thumbnails
- 📈 Track mod versions and update status
- ⚠️ Identify potentially broken or outdated mods
- 📋 Import Better Exceptions and LastException reports
- 🤖 AI-powered Mod Doctor for troubleshooting
- ✅ Enable/disable mods easily
- 💾 Create folder backups
- 🎨 Modern Sims-themed interface

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Desktop:** Electron 27
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database:** SQLite3 (better-sqlite3)
- **Build Tool:** Vite
- **AI Integration:** OpenAI API

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/mashalbaigo/sims-hub.git
cd sims-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
sims-hub/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index.ts
│   │   ├── preload.ts
│   │   └── ipc/
│   ├── renderer/            # React frontend
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── styles/
│   │   └── utils/
│   ├── services/            # Business logic
│   │   ├── modScanner.ts
│   │   ├── packageParser.ts
│   │   ├── updateChecker.ts
│   │   ├── errorParser.ts
│   │   ├── backupManager.ts
│   │   ├── aiDoctor.ts
│   │   └── database.ts
│   └── shared/
├── public/
├── tests/
├── docs/
└── package.json
```

## Development Roadmap

### Phase 1: MVP (Weeks 1-4)
- [ ] Project setup ✅
- [ ] Mod folder scanning
- [ ] Basic mod listing UI
- [ ] Enable/disable functionality
- [ ] Backup manager

### Phase 2: Smart Detection (Weeks 5-8)
- [ ] Package metadata extraction
- [ ] Mod categorization
- [ ] CurseForge API integration
- [ ] Update checker

### Phase 3: Error Analysis (Weeks 9-12)
- [ ] LastException.txt import
- [ ] Better Exceptions parsing
- [ ] Error categorization
- [ ] Basic suggestions

### Phase 4: AI Integration (Weeks 13-16)
- [ ] OpenAI/Claude integration
- [ ] Mod Doctor chat interface
- [ ] Response caching

### Phase 5: Polish & Release (Weeks 17-20)
- [ ] UI theming (Sims aesthetic)
- [ ] Auto-updater
- [ ] Installer
- [ ] Documentation
- [ ] v1.0 Release

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md)

## License

MIT License - See [LICENSE](LICENSE) file

## Support

Questions? Open an issue or check out our documentation!

---

**Made with ❤️ for the Sims community**
