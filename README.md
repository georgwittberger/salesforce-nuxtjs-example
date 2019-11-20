# Salesforce Nuxt.js Example

> Example project of a Nuxt.js app powered by Salesforce data

This example project demonstrates how to integrate a [Nuxt.js](https://nuxtjs.org/) app with Salesforce. It currently includes the following features:

- At server startup products are prefetched via the Salesforce REST API. The app retrieves the name, code and description of all active records of the _Product2_ object and caches them internally to serve the product data from its own API endpoint.
- Salesforce community users (with a profile derived from _Customer Community User_) can authenticate at the server using their Salesforce credentials. The server sends them on a OAuth2 roundtrip and retrieves the user information from Salesforce once authentication was successful. The user info is stored in the session so that further requests can use it to identify the user calling the API.

## Preparing the Salesforce Org

1. In _Salesforce Setup_ open the _App Manager_ and create a _New Connected App_ with the following settings.
   - _Connected App Name:_ {Some name of your choice}
   - _API Name:_ {Some compliant API name of your choice}
   - _Contact Email:_ {your e-mail address}
   - _Enable OAuth Settings_
   - _Callback URL:_ <http://localhost:3000/login/callback>
   - _Selected OAuth Scopes:_
     - Access your basic information (id, profile, email, address, phone)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
   - _Require Secret for Web Server Flow_
2. After creating the connected app copy the _Consumer Key_ and _Consumer Secret_ for later use.
3. Clone the user profile _Customer Community User_ to create a custom community profile.
4. Grant the custom community profile access to the connected app created before.
5. Create a new customer community (e.g. using the template _Build Your Own_)
6. In the _Administration_ of the community workspace go to _Members_ and assign the custom community profile to the _Selected Profiles_.
7. Activate and publish the new community.
8. After creating the community copy its _URL_ from the _All Communities_ page for later use. Important: Copy the displayed URL, not the target of the hyperlink!
9. Create a customer user for one of your contacts and assign the user the custom community profile.
10. Make sure you can log in to the new community with that customer user.
11. Ensure that your Salesforce admin user has a security token. You can reset the token in the user settings area.

## Running the Application

1. Install [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).
2. Open a terminal in the project directory and install the dependencies.

   ```bash
   yarn install
   ```

3. Set the username and password (incl. security token) of your Salesforce admin user as environment variables. These credentials are used to connect the server app to your Salesforce org, for example to prefetch product data at startup.

   ```bash
   SALESFORCE_USERNAME={username}
   SALESFORCE_PASSWORD={password}{security token}
   ```

4. Set the OAuth2 configuration for the connected app as environment variables. This is required to allow users to log in with their Salesforce credentials and enables the server app to interact with the Salesforce org on behalf of those users.

   ```bash
   SALESFORCE_AUTH_URL={community url}/services/oauth2/authorize
   SALESFORCE_TOKEN_URL={community url}/services/oauth2/token
   SALESFORCE_USER_INFO_URL={community url}/services/oauth2/userinfo
   SALESFORCE_CLIENT_ID={connected app consumer key}
   SALESFORCE_CLIENT_SECRET={connected app consumer secret}
   ```

5. Run the application in development mode.

   ```bash
   yarn dev
   ```

6. Open the browser on <http://localhost:3000>

## License

[MIT](https://opensource.org/licenses/MIT)
