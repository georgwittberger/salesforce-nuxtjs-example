# Salesforce Nuxt.js Example

> Example project of a Nuxt.js app powered by Salesforce data

## Running the Application

1. Install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).
2. Open a terminal in the project directory and install the dependencies.

   ```bash
   yarn install
   ```

3. Set the username and password (incl. security token) of a Salesforce user as environment variables. These credentials are used to query product data from the Salesforce org.

   ```bash
   SF_USERNAME={username}
   SF_PASSWORD={password}{security token}
   ```

4. Run the application in development mode.

   ```bash
   yarn dev
   ```

5. Open the browser on <http://localhost:3000>

## License

[MIT](https://opensource.org/licenses/MIT)
