# To-Do List Project

## Overview
This is a full-stack To-Do List application built using Node.js, Express, React, and PostgreSQL as the database. The application allows users to manage their tasks efficiently.

## Features
- Add, edit, and delete tasks
- Mark tasks as completed
- User authentication (if implemented)
- Responsive UI

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- PostgreSQL
- npm or yarn

## Installation
Follow these steps to set up the project:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies
You need to install dependencies in three locations: root, client, and server.

#### Install dependencies in the root directory:
```bash
npm install
```

#### Install dependencies in the client directory:
```bash
cd client
npm install
```

#### Install dependencies in the server directory:
```bash
cd ../server
npm install
```

### 3. Set Up the Database
1. Start your PostgreSQL server.
2. Create a new database.
3. Update the database credentials in the server configuration (e.g., `.env` or `config.js`).

### 4. Start the Application
Run the following command from the root of the project:
```bash
npm run start
```
This will start both the client and server concurrently.

## Usage
- Open your browser and go to `http://localhost:3000` (or the specified port in your configuration).
- Use the UI to manage your tasks.

## Environment Variables
Make sure to configure your `.env` file in the `server` directory with the following:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=5432
```

## License
This project is licensed under the MIT License.

