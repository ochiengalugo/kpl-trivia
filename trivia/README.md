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

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   npm run dev
   

4. **View in browser:**
   Open  `http://localhost:5173`  Vite



## API Used and Endpoints

### Primary API Details
* **API Name:** Open Trivia Database (OTDB)
* **API Documentation:** [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)
* **Access Type:** Public, Unauthenticated
* **HTTP Method:** `GET`

### Base URL
```text
https://opentdb.com/api.php
```

### Endpoint & Query Parameters Used
```text
https://opentdb.com/api.php?amount={amount}&category=21&difficulty={difficulty}&type=multiple
```


## Challenges, Errors, and Known Bugs

### 1. Special Character HTML Entity Encoding
* **Challenge:** The Open Trivia Database returns string fields containing raw HTML entities (e.g., `&quot;`, `&#039;`, `&amp;`), causing unformatted entity code to appear in question texts and buttons.
* **Resolution:** Created a utility decoder function leveraging DOM string parsing (`textarea` element) to decode all HTML entities into standard text before setting state.

### 2. API Rate Limiting (`response_code: 5`)
* **Challenge:** Making rapid consecutive API requests (e.g., frequently resetting parameters) triggers rate limits, returning a `response_code` of `5` instead of question objects.
* **Resolution:** Wrapped all API calls in a `try...catch` block inspecting `response_code`. If `response_code !== 0`, a user-friendly error banner renders, prompting the user to wait briefly before retrying.



### 3. Known Bugs & Edge Cases
* **Exhausted Query Parameters:** Requesting 20 questions on `hard` difficulty can occasionally exhaust available questions in Category 21, returning an empty set. Handled gracefully with an empty-state message directing the user to adjust match parameters.