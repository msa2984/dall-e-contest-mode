import json
from flask import Blueprint, jsonify, request
from better_profanity import profanity

import os, sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from services.open_ai_service import generate_image


api = Blueprint('api', __name__, url_prefix="/api")

@api.route('/create', methods = ['POST']) 
async def create_image():
    '''
    A method which creates an image using OpenAI's DALL-E.
    First, it ensures the prompt provided by the user is not
    profane (swear words, inappropriate topic). If this check
    succeeds, it will attempt to generate the image.
    '''
    try:
        profanity.load_censor_words()
        prompt = request.json['prompt']
        user = request.headers['username']

        if(prompt is None or prompt == ''):
            return json.dumps({"error": "The user did not provide a prompt to create an image for!",}), 403

        isProfaneText = profanity.contains_profanity(prompt)

        if(isProfaneText):
            print(f'{user} requested an image of {prompt}. This requested was deemed inappropriate or profane.')
            return json.dumps({"error": "The user's request contained offensive or profane content. Please retry with an appropriate request.",}), 403
    
        image_url = await generate_image(prompt)

        if(image_url is None):
            return json.dumps({'user_input': prompt, 'generated_url': None, 'error': 'Sorry, an image was not generated'}), 500
        
        return json.dumps({'user_input': prompt, 'generated_url': image_url, 'error': None}), 200
    except Exception as e:
        return json.dumps({"error": e}), 500