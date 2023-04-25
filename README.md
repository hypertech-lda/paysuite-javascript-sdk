# Paysuite SDK for JavaScript

The Paysuite SDK for JavaScript allows you to easily integrate Paysuite payment gateway in your JavaScript application.

## Installation
To install the SDK, add the following line to your dependecies:
<pre>
  <code>
    "dependencies": {
      "paysuite": "github:JefferMarcelino/paysuite-sdk-js",
      ...
    }
  </code>
</pre>

Then run:
<pre>
  <code>
    npm install
  </code>
</pre>

## Usage
### Initialize the client
To use the Paysuite SDK, you first need to create a new instance of the Paysuite client:
<pre>
  <code>
    const { Client } = require('paysuite-sdk-js');

    const client = new Client({
      privateKey: 'your_50_characters_private_key',
      isTest: 1,
      currency: 'MZN',
      callbackUrl: 'http://localhost:3000/callback',
      returnUrl: 'http://localhost:3000/return'
    });
  </code>
</pre>

### Generate payment link
To generate a payment link, you can use the generatePaymentLink method:
<pre>
  <code>
    const paymentLink = await client.generatePaymentLink(amount, purpose);
    console.log(paymentLink);
  </code>
</pre>

## Contributing
We welcome contributions from the community! To contribute to the project, please follow these steps:

- Fork the repository and clone it to your local machine
- Create a new branch for your feature or bug fix
- Write your code and tests
- Push your changes to your fork
- Open a pull request to the main branch of this repository
- Please make sure to follow the code style and best practices used in the existing codebase. We also recommend running the linter and tests before submitting your code.

