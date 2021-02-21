# NecuKuciWeb
Web application that will support and enhance NecuKuci mobile applications

## Setup Development Machine
1. Pull the code to dev machine and `cd <project_root>`
2. Install & configure AWS CLI (if not done already). Request user details
   ```bash
   aws configuer list
   ```
   ```bash
   brew install awscli
   aws configure
   ```
3. Install npm dependencies for both client & server
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```
4. Open server
    ```bash
    cd server
    npm start
    ```
5. Open client
    ```bash
    cd client
    npm run dev
    ```
6. Open `http://localhost:8080` in browser
