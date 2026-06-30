# Cook-Off 10.0 Portal: Scalable Competitive Coding

**The ultimate real-time competitive programming platform built to handle hundreds of concurrent coders without breaking a sweat.**


## The Problem
During live coding contests, hundreds of users submit code, save drafts, and run tests simultaneously in the final 5 minutes. Most platforms crash, lose drafts, or lag out, ruining the contest experience.

## The Outcome
A flawless, real-time contest experience with zero dropped submissions and sub-second compiler feedback for over 1,000 users.

## How It Works (The Mechanism)
1. **Triple-Layer Persistence:** Code state is guaranteed through local Zustand state, fast Redis in-memory caching, and durable MongoDB storage. 
2. **Custom CodeMirror Editor:** Built a customized editor that handles syntax highlighting, auto-completion, and real-time syncing without blocking the main thread.
3. **Auto-Submission:** Code is automatically submitted when the timer runs out, ensuring no participant loses progress.
4. **Optimized Server Actions:** Reduced payload sizes and utilized Next.js Server Components to render the live leaderboard instantly.

---

## Detailed Features

- **Advanced Code Editor**: Powered by CodeMirror, supporting multiple languages (Python, Java, C++, etc.), themes, and keybindings.
- **Progress Restoration**: Your code, selected language, and current round are automatically saved to `localStorage`, allowing you to resume your session anytime.
- **Auto-Submission**: Code is automatically submitted when the timer runs out, ensuring no progress is lost.
- **Resizable Layout**: A flexible and resizable panel layout to customize your workspace.
- **Real-time Scoreboard**: Users can monitor their scores in real time as they complete rounds.
- **Multi-language Support**: The portal uses the Monaco editor, with support for many languages like Python, Java, C++, etc.
- **Real-time Compiler Feedback**: Get instant feedback on your code with detailed compiler messages and test case results.

### Login Interface
![Login](/projects/cookoff-portal-10.0/login.png)

### Live Dashboard
![Dashboard](/projects/cookoff-portal-10.0/dashboard.png)

### The Kitchen (Code Editor)
![Kitchen](/projects/cookoff-portal-10.0/kitchen.jpg)

---

## Frontend System Design & State Management

The application is designed as a highly interactive and real-time single-page application (SPA) built on Next.js. The frontend architecture is centered around a clean, component-based structure and a centralized state management system.

### Frontend Architecture

1.  **Component-Based Structure**: The UI is built using React and organized into a set of reusable components. Larger components, such as the `Dashboard` and `Editor`, are composed of smaller, more focused components.
2.  **Routing**: Next.js App Router is used for navigation, providing a file-system-based routing mechanism that supports nested layouts and server-side rendering.
3.  **State Management**: Zustand is employed for global state management. It offers a simple, unopinionated, and scalable way to manage state that is shared across multiple components, such as user authentication status, editor content, and submission results.

### Zustand State Management (`useKitchenStore`)

The coding part of the application's state is managed by a single Zustand store, `useKitchenStore`. This store is the single source of truth for the "Kitchen" (the main coding environment).

- **State Slices**: The store is organized into logical slices:
  - **Session State**: `round`, `selectedQuestionId`, `submissionStatus`.
  - **Editor State**: `codeByQuestion`, `languageByQuestion`, `selectedLanguage`.
  - **Data**: `questions`, `testCases`.
  - **UI State**: `fullScreenEditor`, `showModal`, etc.
  - **Results**: `testResults`, `compilerDetails`.

- **Persistence**: The `persist` middleware is used to save critical state to `localStorage`. This includes:
  - `codeByQuestion`: The code for each question.
  - `languageByQuestion`: The selected language for each question.
  - `round`: The user's current round.

  This ensures that a user can refresh the page or close the tab without losing their progress.

- **Component Interaction**:
  - **`Editor`**: The editor component reads and writes code to the store using `setCodeForQuestion`.
  - **`LanguageSelector`**: This component updates the `selectedLanguage` and `languageByQuestion` slices.
  - **`TestCases`**: Displays results from `testResults` and `compilerDetails`.

### The Value Stack
* **Framework**: Next.js (with Turbopack)
* **Language**: TypeScript
* **Styling**: Tailwind CSS with `tailwind-merge` and `clsx`
* **UI Components**: Shadcn/UI
* **State Management**: Zustand
* **Form Handling**: React Hook Form & Zod
* **Code Editor**: CodeMirror
* **HTTP Client**: Axios
* **Notifications**: Firestore, React Hot Toast

## The Proof
* Sustained **40% concurrent load** across **1,000+ users** without a single dropped submission.
* Maintained **sub-second response times** during peak submission windows.
* Delivered a rock-solid, scalable platform for CodeChef-VIT's premier event.
