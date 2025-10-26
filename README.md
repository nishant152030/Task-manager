# Task-manager

A simple, lightweight Todo / Task Manager built with React and TypeScript.

This repository contains a minimal task-manager app intended as a learning project and a base you can extend. It provides the common todo features such as adding, editing, completing, deleting tasks and filtering / searching tasks. It's intentionally small and easy to understand so you can use it to learn React + TypeScript and experiment with features you want to add.

Table of contents
- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Usage](#usage)
- [Persisting data](#persisting-data)

Demo
- (Optional) Add a screenshot/gif of the app here or a hosted demo link if available.

Features
- Add new tasks with title and optional description.
- Edit task title/description.
- Mark tasks complete / incomplete.
- Delete tasks.
- Filter tasks (All / Active / Completed) and simple search.
- Task persistence using browser localStorage (no backend required).
- Built with TypeScript for safer, self-documenting code.

Tech stack
- React
- TypeScript
- CSS (or your preferred styling solution)
- Vite or Create React App (depending on how the project was scaffolded)
- Optional: ESLint, Prettier (if included in the repo)

Getting started

Prerequisites
- Node.js (>= 14) and npm or yarn installed on your machine.
- A code editor (VS Code recommended).

Install
1. Clone the repository
   git clone https://github.com/nishant152030/Task-manager.git
2. Change into the project directory
   cd Task-manager
3. Install dependencies
   npm install
   # or
   yarn

Available scripts
(Depending on the scaffold used, one of these command sets will work. Replace with the exact scripts found in package.json if you prefer.)

- npm start / yarn start
  - Starts the development server (hot reload).
  - Example: npm start
- npm run build / yarn build
  - Builds the app for production into the `dist` (Vite) or `build` (CRA) folder.
- npm test / yarn test
  - Runs tests (if any).
- npm run lint / yarn lint
  - Runs linting (if configured).
- npm run format / yarn format
  - Runs Prettier (if configured).

Project structure
A typical structure you can expect or adapt to:
- src/
  - components/   — React components (TaskList, TaskItem, TaskForm, Header, Filters)
  - hooks/        — Reusable hooks (e.g., useLocalStorage)
  - pages/        — Page-level components (if any)
  - utils/        — Utility helpers and types
  - assets/       — Images, icons
  - index.tsx     — App entry
  - App.tsx       — Root component
- public/         — Static files (if CRA or similar)
- package.json
- tsconfig.json
- README.md

Usage
- Add a task: Type a title (and optionally a description) and press the Add button or Enter.
- Edit a task: Click the edit icon or task title (UX dependent) to update.
- Complete a task: Toggle the checkbox / mark complete button.
- Delete a task: Click the delete/trash icon.
- Filter: Use the filter controls to show All / Active / Completed tasks.
- Search: Type in the search box to filter tasks by title/description.

Persisting data
- The app uses browser localStorage to persist tasks between sessions (no backend required). To reset stored tasks, clear the app's localStorage entry via browser DevTools > Application > Local Storage.


