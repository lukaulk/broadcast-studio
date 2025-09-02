# Contributing to Broadcast Studio

Thank you for your interest in contributing to Broadcast Studio! This document provides guidelines and instructions for contributing to our project.

## Getting Started

### Prerequisites

- **Node.js** (v18 or newer)  
- **Bun** (for package management)  
- **Python** (v3.9 or newer)  
- **Docker and Docker Compose** (optional, but recommended for the backend)  

### Setup

1. Fork the repository  
2. Clone your fork locally  
3. Navigate to the main project folder  
5. Install dependencies:

```bash
bun install
```

6. Start the frontend development server:

```bash
bun run dev
```

7. Start the backend server (if contributing to backend):

```bash
# Activate the virtual environment
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

---

## Focus Areas

### 🎯 Good Areas to Contribute

* Interface features for network topology (React Flow)
* Improvements to terminal experience and network commands (ping, traceroute, etc.)
* Implementation of new network nodes (routers, switches)
* Frontend performance optimizations
* Bug fixes
* UI/UX and documentation improvements
* Development of new backend features (Core Emulator API)

### ⚠️ Areas to Avoid

* Complex enhancements to network node link system (react-flow)
* Real-time data visualization optimizations
* Network traffic simulation system improvements

**Why?** We are planning a major restructuring of the link and data traffic simulation system to ensure higher accuracy. The current system is an initial version — the final approach will be more robust and realistic. To avoid wasted effort, please focus on other areas of the app until this refactor is complete.

If you are unsure whether your idea falls into an area to avoid, feel free to open a GitHub issue to discuss!

---

## Development Workflow

### Local Development

* Start the development server: `bun run dev`
* Start the backend server: `python main.py`

### How to Contribute

1. Create a new branch:

```bash
git checkout -b feature/your-feature
```

2. Make your changes
3. Run the linter: `bun run lint`
4. Format your code: `bun run format`
5. Commit your changes with a descriptive message
6. Push to your fork and create a pull request

---

## Code Style

* We use **ESLint** for linting and formatting
* Run `bun run format` to format code
* Run `bun run lint` to check for linting issues
* Follow existing code patterns

---

## Pull Request Process

* Fill out the pull request template completely
* Link the PR to any related issues
* Ensure CI (Continuous Integration) passes
* Request review from maintainers
* Respond to any feedback received

---

## Community

* Be respectful and inclusive
* Follow our Code of Conduct
* Help others in discussions and issues

---

**Thank you for your contribution!**

