import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

# load environment variables from .env file.
load_dotenv()

async def verify_openai_connection() -> bool:
    '''
    This function verifies the REST API can reach the OpenAI API.
    It uses the OPENAI_API_KEY environment variable to authenticate.
    If the service cannot be used to perform a simple chat completion,
    or an exception is raised, return False. Otherwise, return True.
    '''
    try:
        client = AsyncOpenAI()

        chat_completion = await client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Say this is a test",
                }
            ],
            model="gpt-3.5-turbo",)
        
        if(chat_completion.choices[0] is None):
            print('Sorry, a completion was not returned. There is an issue connecting to OpenAI.')
            return False
        
        return True
    except Exception as e:
        print(e)
        return False

async def generate_image(prompt: str) -> str:
    '''
    This function generates images using DALL-E.
    If an image cannot be generated, it returns None.
    Otherwise, it returns the URL which hosts the
    generated image.
    '''
    try:
        client = AsyncOpenAI()

        image_response = await client.images.generate(
            prompt=prompt,
            model=os.environ.get('OPENAI_DALL_E_DEPLOYMENT_NAME'),
            n=1,)

        print(image_response)
        if(image_response.created <= 0):
            print('Sorry, an image was not created. Check the logs for issues.')
            return None
        
        return image_response.data[0].url
        
    except Exception as e:
        print(e)
        return None