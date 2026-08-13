# KPL Sports Trivia

## My Project Description
KPL Sports Trivia is an interactive single-page React application built to test user's sports knowledge. The app allows users to configure custom match parameters, dynamic score tracking with speed-based bonus points, streak monitoring, and a full game review. Previous match scores are automatically saved to `localStorage` and displayed on a dedicated Leaderboard page.

### Key Features
* **Navigation:** Built using `react-router-dom` to handle seamless page transitions without full page reloads (`Home`, `Arena`, and `Leaderboard`).
* **Asynchronous Fetching:** Dynamically retrieves sports trivia questions from the Open Trivia Database API based on user-selected settings.
* **Controlled Components:** Uses controlled forms to capture user preferences before kicking off a game session.
* **State Management & Edge Cases:** Robust state logic handling loading spinners, API errors, and empty score states.

## Setup Instructions
Follow these steps to run the project locally on your machine:
1. **Clone the repository:**
   ``bash
   git clone https://github.com/ochiengalugo/kpl-trivia
   cd kpl-trivia
