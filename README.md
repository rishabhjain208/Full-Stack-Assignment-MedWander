# Dynamic Forms Demo

This repository contains a full-stack application demonstrating dynamic form submission, retrieval, and Excel sheet update functionality. The backend is built with Node.js, Express, and MongoDB, while the frontend uses React and Tailwind CSS for the UI.

## Installation

Follow these steps to set up the application:

### Backend

1. **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file** and add your MongoDB connection string:
    ```plaintext
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
    ```

4. **Start the backend server:**
    ```bash
    node index.js
    ```

### Frontend

1. **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend development server:**
    ```bash
    npm run dev
    ```

## How to Run the Application

1. **Backend:** Ensure the backend server is running on port 3000.
    ```bash
    cd backend
    node index.js
    ```

2. **Frontend:** Ensure the frontend server is running.
    ```bash
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Functionality

### Backend

- **Express Server:** The backend server is set up with Express and listens on port 3000.
- **MongoDB Connection:** Connects to MongoDB using Mongoose.
- **Form Submission:** API route to submit forms and save them to the database.
- **Fetch All Forms:** API route to fetch all submitted forms.
- **Refresh Excel:** API route to update an Excel sheet with form data.

### Frontend

- **React Application:** A React app with components to handle form submission, data fetching, and Excel refresh.
- **Dynamic Forms:** Buttons to switch between different forms (Form A and Form B).
- **Toast Notifications:** Visual feedback for user actions using `react-toastify`.
- **Tailwind CSS:** Used for styling the user interface.

### Folder Structure

- `backend`
  - `model`
    - `Form.js`: Mongoose schema and model for form data.
    - `excelUtils.js`: Utility function to update an Excel sheet.
  - `routes`
    - `submit.js`: Express routes for form submission, data retrieval, and Excel refresh.
  - `ExcelData`
    - `data.xlsx`: Excel file to store form data.
    - 
  - `index.js`: Main server file to set up Express server.

- `frontend`
  - `src`
    - `components`
      - `FormSub.jsx`: Form component to handle form input and submission.
    - `App.js`: Main application file.
    - `index.js`: Entry point for the React application.
  - `public`
    - `index.html`: HTML template.
  - `tailwind.config.js`: Tailwind CSS configuration file.

### API Endpoints

- `POST /api/v1/test/submitForm`: Submit a new form.
- `GET /api/v1/test/getAllForms`: Retrieve all submitted forms.
- `GET /api/v1/test/refreshExcel`: Refresh the Excel sheet with form data.

## Dependencies

### Backend

- express
- cors
- body-parser
- mongoose
- xlsx

### Frontend

- react
- react-dom
- react-toastify
- axios
- tailwindcss

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
