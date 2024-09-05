# Encryption Decryption Program

This repository contains a TypeScript program that encrypts and decrypts data using AES-256-CTR. It includes Mocha tests to validate the functionality.

## Getting Started

Follow these instructions to clone the repository, install the necessary dependencies, and run the tests locally or within a Docker container.

### Prerequisites

- [Node.js](https://nodejs.org/) (includes `npm`)
- [Docker](https://www.docker.com/get-started)

### Installation

1. **Clone the Repository**

   git clone <repository-url>
   cd <repository-name>

2. **Install dependencies**

    npm install
    npm install --save-dev mocha ts-node typescript @types/node @types/mocha

3. **Dockerize and run**

    Build docker image: docker build -t <image-name> .
    Run docker container: docker run --rm <image-name>

## Desired output:

Output should be "Decrypted plaintext: <decrypted-plaintext>"
