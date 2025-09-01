Broadcast Studio 📡
Overview

Broadcast Studio is a next-generation computer network simulator, designed to be a modern and robust alternative to tools like Cisco Packet Tracer. Our intuitive web platform allows users to build, simulate, and test complex network topologies directly in their browser, with a friendly interface and advanced features. 🌐

Whether you're a student, a teacher, or an IT professional, Broadcast Studio provides the flexibility and power needed to visualize, experiment with, and master the world of computer networks. 💻✨
Key Features

    Visual Topology Editor: Create and visualize network topologies by dragging and dropping devices (routers, switches, PCs) onto a canvas. 🖱️

    Real-Time Simulation: Watch data traffic and network behavior in real time. 🚦

    Integrated Terminal: Use a built-in terminal to test device connectivity and configuration by running commands like ping and traceroute. 🚀

    Cross-Platform Compatibility: Developed as a web application, it can be accessed from any device and is prepared for a future desktop version. 📱🖥️

Project Architecture

Broadcast Studio follows a modern and scalable architecture, divided into three main parts:

    Front-end: Built with Next.js (React), it provides the user interface (UI) for creating topologies. Interactivity and visualization of links between nodes are managed with the React Flow library.

    Back-end: A robust Python API serves as the simulation engine. It uses the CORE Emulator API to create and manage virtual networks, acting as the bridge between the UI and the actual simulation.

    Connector (Middleware): This will be an intermediate layer, ensuring smooth and efficient communication between the front-end and the back-end.

Technologies Used

    Front-end:

        Next.js

        React

        React Flow

        TypeScript

        Tailwind CSS (for styling)

    Back-end:

        Python

        CORE Emulator API

    Development Tools:

        Bun (Package Manager)

        ESLint (Code Quality Linter)

        VS Code (Editor)

Getting Started
Prerequisites

Make sure you have Bun installed on your system.
Project Setup

# Clone the repository
git clone [https://github.com/your-username/broadcast-studio.git](https://github.com/your-username/broadcast-studio.git)

# Navigate to the project directory
cd broadcast-studio

Installation

# Install front-end dependencies with Bun
bun install

Running the Project

To start the Next.js development server:

# Start the development server
bun dev

Open your browser and go to http://localhost:3000 to see Broadcast Studio in action. 🎉
Contributing

Contributions are always welcome! If you have ideas for new features, improvements, or find any bugs, please open an issue or a pull request. 🙏
License

This project is licensed under the MIT License.
