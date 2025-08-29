This project is a small-scale implementation of an online code execution tool, similar to what you might find on platforms like LeetCode. It features a Node.js/Express backend for handling code execution and a clean, functional React UI.

## ✨ Features

* **Safe Python Execution:** Runs Python code in an isolated child process to prevent it from affecting the server environment.
* **Security Blacklist:** Prevents the use of potentially dangerous modules and commands (`os`, `subprocess`, `import`, etc.).
* **Real-time Streaming Output:** The backend streams `stdout` and `stderr` directly to the client as the code executes, allowing users to see output as it's generated.
* **Clean, Simple UI:** A straightforward interface built with React for a smooth and intuitive user experience.

## 🛠️ Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express
* **Styling:** Plain CSS

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your system:

* [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
* npm (usually comes included with Node.js)
* [Python 3](https://www.python.org/downloads/)

### Installation & Setup

1.  **Clone the Repository**
    Open your terminal and clone this repository to your local machine.
    ```bash
    git clone [https://github.com/Kathan99/Python-compiler-assignment.git](https://github.com/Kathan99/Python-compiler-assignment.git)
    ```

2.  **Navigate to the Project Directory**
    ```bash
    cd Python-compiler-assignment
    ```

3.  **Install Backend Dependencies**
    In the root directory, run the following command to install the server's dependencies.
    ```bash
    npm install
    ```

4.  **Install Frontend Dependencies**
    Navigate into the `frontend` directory and install its dependencies.
    ```bash
    cd frontend
    npm install
    ```

---

## ▶️ Running the Application

To run the application, you will need to have **two separate terminal windows** open: one for the backend server and one for the frontend React app.

### 1. Start the Backend Server

* Navigate to the **root directory** of the project in your first terminal.
* Run the following command:
    ```bash
    node server.js
    ```
* You should see a confirmation message: `Server is running on http://localhost:8000`

### 2. Start the Frontend Application

* Navigate to the **`/frontend` directory** in your second terminal.
* Run the following command:
    ```bash
    npm start
    ```
* This will automatically open a new tab in your web browser with the application running at `http://localhost:3000`.

You can now use the application to write and execute Python code!