
# MANRURA: Ward Management Assistant

MANRURA (Manajemen Ruang Rawat) is a sophisticated, role-based web application designed to digitize the assessment and management of hospital ward standards at RSUP Dr. Kariadi. It provides a comprehensive platform for ward staff, assessors, and administrators to interact with management standards, conduct assessments, track progress, and generate insightful reports powered by the Google Gemini API.

The application leverages a lightweight frontend built with React and TypeScript, using Google Sheets as a surprisingly powerful and accessible serverless backend.

## Table of Contents
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Application Flow & Architecture](#application-flow--architecture)
- [Detailed Setup & Configuration](#detailed-setup--configuration)
- [File Structure](#file-structure)

## Core Features

- **Role-Based Access Control (RBAC)**: A tailored user experience for three distinct roles:
    - **Ward Staff**: Can perform self-assessments for their assigned ward, score evaluation points, add notes, and upload evidence directly to Google Drive.
    - **Assessor**: Can review self-assessments, provide official validation scores and notes, and view data for any ward.
    - **Admin**: Has a global-view of all data. The Admin Dashboard includes reporting, system management, and AI configuration.

- **Interactive Standards Guide**: A public-facing, easy-to-navigate digital version of the MANRURA standards, allowing anyone to browse and understand the requirements.

- **Digital Assessment Workflow**:
    - **Dynamic Scoring**: Users can score points (0, 5, 10) and provide qualitative notes.
    - **Evidence Upload**: Seamlessly upload files (images, PDFs, documents) as evidence, which are stored in Google Drive.
    - **Validation Lock**: Once an assessor validates a point, it becomes read-only for the Ward Staff, ensuring data integrity.
    - **Assessment Periods**: Admins can define specific time windows during which assessments are active and can be edited.

- **Powerful Admin Dashboard**:
    - **Reporting & Analytics**: Visual dashboards with charts (Bar, Radar) to compare ward performance, analyze compliance by standard, and identify the strongest and weakest points across the hospital.
    - **AI-Powered Analysis**: With a configured Gemini API key, admins can generate a comprehensive, qualitative analysis of a ward's performance, complete with a summary, strengths, areas for improvement, and actionable recommendations.
    - **System Management**: Admins can create and manage user accounts, hospital wards, and assessment periods directly from the UI.

- **Gemini AI Assistant**: An integrated chatbot that acts as an expert on the MANRURA standards. It uses the Gemini API to provide instant, accurate answers to user questions based *exclusively* on the official standard documents embedded in the application.

- **Serverless Backend**: Utilizes a Google Sheet as a database, managed via a Google Apps Script Web App. This provides a cost-effective, scalable, and easily manageable backend solution.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Charting Library**: `Chart.js` with `react-chartjs-2`
- **Backend**: Google Apps Script (as a RESTful API)
- **Database**: Google Sheets
- **File Storage**: Google Drive

## Application Flow & Architecture

The application is a single-page application (SPA) with a clear, component-based architecture.

1.  **Entry Point (`index.tsx`)**: Initializes the React application and wraps it in context providers (`AuthProvider`, `ApiKeyProvider`) for managing global state.

2.  **Data Loading (`App.tsx`)**: On startup, the app makes a single API call via `getAllData` in `apiService.ts` to fetch all initial data (users, wards, assessments, periods) from the Google Sheet backend. It handles loading and potential configuration error states.

3.  **Authentication**:
    - Unauthenticated users see the `PublicLandingPage.tsx`, a read-only view of the standards.
    - Clicking "Login" shows the `LoginScreen.tsx`.
    - `AuthContext.tsx` manages the user's login state, persisting the current user's data (without password) to `localStorage` for session persistence.

4.  **Authenticated Experience (`AuthenticatedApp.tsx`)**:
    - This component is the core of the logged-in experience. It orchestrates the main UI elements.
    - The `Sidebar.tsx` allows navigation between different standards and the admin dashboard.
    - The main content area conditionally renders either the `AdminDashboard.tsx` or the `ContentDisplay.tsx` based on the user's role and selection.
    - All data modifications (e.g., scoring a point) are handled by functions within `AuthenticatedApp.tsx`. These functions first update the local state for a snappy UI response (optimistic update) and then send the update to the Google Apps Script backend via `apiService.ts`. A `SaveStatusIndicator.tsx` provides visual feedback on the save state.

5.  **Backend Communication (`apiService.ts`)**:
    - This file is the sole interface between the frontend and the backend.
    - It contains a `SCRIPT_URL` constant that must be configured to point to the deployed Google Apps Script Web App.
    - All requests are `POST` requests containing an `action` and a `payload`, which the Apps Script uses to route the request to the correct backend function (e.g., `addUser`, `updateAssessment`).

6.  **AI Services (`geminiService.ts`)**:
    - This service contains the logic for interacting with the Gemini API.
    - `askManruraAssistant`: Powers the chatbot. It uses a detailed system prompt that includes the entire `manruraData.ts` content, instructing the model to answer questions based only on that provided context.
    - `generateAssessmentAnalysis`: Powers the admin report generation. It formats the assessment data and uses a specific prompt to guide the AI in creating a structured, insightful report.

## Detailed Setup & Configuration

To run this application, you must set up both the Google Apps Script backend and configure the frontend. Follow these steps carefully.

### Part 1: Backend Setup (Google Sheets & Apps Script)

This process turns a simple Google Sheet into a powerful, serverless backend for your application.

#### Step 1: Create Google Sheet & Apps Script Project
1.  Go to [sheets.google.com](https://sheets.google.com) and create a new, blank spreadsheet. Name it something descriptive, like "MANRURA_Backend".
2.  In your new Sheet, click on `Extensions` > `Apps Script`. This will open a new script editor tab. Name your script project (e.g., "MANRURA API").

#### Step 2: Paste the Backend Code
1.  Delete any boilerplate code in the `Code.gs` file.
2.  Open the `appscript.md` file in this project.
3.  Copy the entire Google Apps Script code from `appscript.md` and paste it into the script editor.
4.  Click the "Save project" icon (floppy disk).

#### Step 3: Run the `setup` function
1.  In the Apps Script editor, ensure the function `setup` is selected from the function dropdown menu next to the "Debug" button.
2.  Click the **Run** button.
3.  A popup will appear asking for "Authorization required". Click `Review permissions`.
4.  Choose your Google account. You might see a "Google hasn’t verified this app" warning. This is normal. Click `Advanced`, then click `Go to [Your Script Name] (unsafe)`.
5.  Review the permissions the script needs (to manage your sheets and Google Drive) and click `Allow`.
6.  The `setup` function will execute. When it's finished, you'll see a popup message in your Google Sheet saying "Setup Selesai!". Your sheet now has all the required tabs and columns.

#### Step 4: Understand the Sheet Structure
The `setup` function creates the following sheets with specific columns. **Do not change the column names.**

-   **`Users`**: Stores user account information.
    -   `id`, `name`, `email`, `password`, `role`, `wardId`
-   **`Wards`**: Stores hospital ward information.
    -   `id`, `name`
-   **`AssessmentPeriods`**: Stores the start and end dates for assessment windows.
    -   `id`, `name`, `startDate`, `endDate`
-   **`Assessments`**: The main data table, storing every score for every point in every ward.
    -   `uniqueId` (combination of wardId and poinId), `wardId`, `poinId`, `wardStaffScore`, `wardStaffNotes`, `wardStaffEvidence` (JSON), `assessorScore`, `assessorNotes`, `assessorEvidence` (JSON), `assessorId`
-   **`Config`**: Stores system configuration, like the ID of the Google Drive folder for uploads.
    -   `key`, `value`

#### Step 5: Deploy as a Web App
This is the most critical step. It exposes your script as an API endpoint.

1.  In the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2.  Click the gear icon next to "Select type" and choose **Web app**.
3.  Configure the deployment:
    -   **Description**: (Optional) e.g., "MANRURA API v1".
    -   **Execute as**: **`Me`** (Your Google Account).
    -   **Who has access**: **`Anyone`**. This is essential. It does NOT mean anyone can see your sheet data; it only means anyone can *send a request* to your script. The script itself controls the data.
4.  Click **Deploy**.
5.  The script will deploy, and a "Deployment successfully updated" dialog will appear.
6.  **Copy the Web app URL**. This is your unique API endpoint.

### Part 2: Frontend Configuration

1.  **Set the API Endpoint**:
    -   Open the file `services/apiService.ts` in your project.
    -   Find the `SCRIPT_URL` constant.
    -   Paste the **Web app URL** you copied in the previous step, replacing the placeholder.

2.  **Configure AI Features (Optional)**:
    -   Obtain a Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Run the application and log in as an Admin (e.g., `admin@rskariadi.co.id` / `password123`).
    -   Navigate to the `Admin Dashboard` > `Manajemen Sistem` tab.
    -   In the "Konfigurasi AI & Laporan" card, enter your Gemini API Key and click "Simpan". This key will be saved to your browser's `localStorage` and will enable the AI Chatbot and AI Analysis features.

## File Structure

```
.
├── components/
│   ├── AccountManagement.tsx      # Admin UI for managing users and wards.
│   ├── AdminDashboard.tsx         # Main admin dashboard with tabs.
│   ├── AssessmentPeriodManagement.tsx # Admin UI for assessment periods.
│   ├── AssessmentPoin.tsx         # Core component for scoring/viewing a single point.
│   ├── AssessmentSummary.tsx      # Summary card showing progress for a standard.
│   ├── AuthenticatedApp.tsx       # Main layout for logged-in users.
│   ├── Chatbot.tsx                # AI assistant chat interface.
│   ├── ContentDisplay.tsx         # Displays the details of a selected standard.
│   ├── Icons.tsx                  # SVG icon components.
│   ├── LoginScreen.tsx            # User login form.
│   ├── PublicLandingPage.tsx      # Initial page for non-logged-in users.
│   ├── ReportingDashboard.tsx     # Renders charts and tables for admin reports.
│   ├── SaveStatusIndicator.tsx    # Provides feedback on data saving operations.
│   ├── Sidebar.tsx                # Main navigation sidebar.
│   ├── UserRoleSwitcher.tsx       # Dev tool to switch roles for demoing.
│   └── WardSelector.tsx           # Dropdown for Assessor/Admin to select a ward.
├── contexts/
│   ├── ApiKeyContext.tsx          # Manages the Gemini API key globally.
│   └── AuthContext.tsx            # Manages user authentication state.
├── data/
│   └── manruraData.ts             # Static data for all MANRURA standards.
├── services/
│   ├── apiService.ts              # Handles all communication with the Google Apps Script backend.
│   └── geminiService.ts           # Handles all calls to the Google Gemini API.
├── App.tsx                        # Root component, handles routing and initial data load.
├── constants.ts                   # Application-wide constants.
├── index.html                     # Main HTML file.
├── index.tsx                      # Application entry point.
├── README.md                      # This file.
├── appscript.md                   # Contains the Google Apps Script backend code.
└── types.ts                       # TypeScript type definitions for the entire application.
```