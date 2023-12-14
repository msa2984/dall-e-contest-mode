# OpenAI Wrapper REST API

- [OpenAI Wrapper REST API](#openai-wrapper-rest-api)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [References](#references)

## Overview

The project in this [directory](/backend/) is a very simple REST API implemented
using Python 3.10, and all of the packages listed in the
[requirements text file](/backend/src/requirements.txt). This REST API is used
to communicate with [OpenAI](https://openai.com/) in order to generate images
using the DALL-E text-to-image model.

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/Download)
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   1. If you are running this on a Windows machine and it is your
   first time installing Docker Desktop, you may get prompts about
   installing Windows Subsystem for Linux (WSL). You must install this
   to use Docker Desktop.
   2. If you do not want to install Docker Desktop, installing
   [Python 3.10](https://www.python.org/downloads/release/python-3100/)
   should be sufficient.
3. This repository, [cloned locally](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
4. A method for sending and receiving HTTP requests.
   Recommended is [Postman](https://www.postman.com/downloads/).

## Getting Started

1. After installing the prerequisites, start Docker Desktop.
2. Start Visual Studio Code. 
3. Open the top-level folder of this repository (this include the .devcontainer
   folder).
4. After opening the folder, you may see a prompt asking to install the
   'Docker extension'. This is optional. However, you may see another prompt
   to reopen the solution inside of a devcontainer - if you did not manually
   install Python 3.10, you *must* select "Rebuild in Container". Please keep
   in mind that when you first configure a devcontainer, it may take
   approximately ten minutes to build.
5. Copy the `.env.template` to a new file named `.env`. Add an API key for
   [OpenAI](https://platform.openai.com/api-keys). You will need to create an
   free account. Keep in mind while testing that free accounts have low limits -
   if you see 429 errors, try your request again in ~5 minutes.
6. From the menu, select Terminal > New Terminal. 
7. In the terminal `cd backend`.
8. In the terminal, `sudo pip install -r src/requirements.txt`.
9. In the terminal, `python src/app.py`.
10. Open Postman, and [import](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/)
    the [sample request collection](/backend/docs/sample_requests.postman_collection).
11. Try each request! If you change the 'prompt' in the 'Create New Image'
    request, it will generate a new image.

## References

- [What is a REST API?](https://www.ibm.com/topics/rest-apis)
- [Learn about DALL-E](https://openai.com/dall-e-2)
- [FLASK - REST APIs implemented in Python](https://flask.palletsprojects.com/en/3.0.x/)