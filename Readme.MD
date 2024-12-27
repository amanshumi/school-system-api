# School System API

This is a Node.js-based API for managing a school system. It includes features for managing schools, classrooms, students, and users, with authentication and rate limiting.
## Features

User authentication and authorization
- CRUD operations for schools, classrooms, and students
- Rate limiting to prevent abuse
- Summary reports for superadmins
- Docker support for containerized deployment

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Docker (optional, for containerized deployment)## Installation

#### 1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/school-system-api.git
   cd school-system-api 
   

#### 2. Install dependencies:
  ```sh
  npm install
  ```
#### 3. Create a .env file in the root directory and add the following environment variables:

    PORT=7000
    MONGO_URI=mongodb+srv://amanshumi:PeunA7hQbBpTWbx@cluster0.9ri7p.mongodb.net/
    MONGO_DB_NAME=test
    MONGO_USER=amanshumi
    MONGO_PASSWORD=PeunA7hQbBpTWbx
    JWT_SECRET=secret_here

    SUPERADMIN_USERNAME=superadmin
    SUPERADMIN_PASSWORD=superadmin
    SUPERADMIN_EMAIL=amanshumi@gmail.com

    LIMIT_PER_MINUTE=100
    ```
## Running the Application

#### 1. Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd school-system-api
```

Install dependencies

```bash
  npm install
```

Start the server in dev

```bash
  npm run start
```

#### 2. Docker

Build the docker image:
```sh
docker compose up -d


