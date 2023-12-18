import uuid
from flask import Blueprint, request, jsonify, make_response
from better_profanity import profanity

import os, sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from services.open_ai_service import generate_image
from services.contest_service import add_contest_image, vote_for_image, get_top_scores, get_all_entries
from models import ContestImage


api = Blueprint('api', __name__, url_prefix="/api")
profanity.load_censor_words()

@api.route('/create', methods = ['POST'])
async def create_image():
    '''
    A method which creates an image using OpenAI's DALL-E.
    First, it ensures the prompt provided by the user is not
    profane (swear words, inappropriate topic). If this check
    succeeds, it will attempt to generate the image.
    '''
    try:
        prompt = request.json['prompt']
        user =  request.json['email']

        if(prompt is None or prompt == ''):
            response = make_response(jsonify({"error": "The user did not provide a prompt to create an image for!"}))
            response.status_code = 403
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            return response

        isProfaneText = profanity.contains_profanity(prompt)

        if(isProfaneText):
            print(f'{user} requested an image of {prompt}. This requested was deemed inappropriate or profane.')
            response = make_response(jsonify({"error": "The user's request contained offensive or profane content. Please retry with an appropriate request.",}))
            response.status_code = 403
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            return response
    
        image_url = await generate_image(prompt)

        if(image_url is None):
            response = make_response(jsonify({'user_input': prompt, 'generated_url': None, 'error': 'Sorry, an image was not generated'}))
            response.status_code = 500
        else:
            response = make_response(jsonify({'user_input': prompt, 'generated_url': image_url, 'error': None}))
            response.status_code = 200
    except Exception as e:
        response = make_response(jsonify({"error": e}))
        response.status_code = 500
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@api.route('/submit', methods = ['POST'])
async def submit_image():
    '''
    A method which submits the user's image URL and description
    to the class contest. It will store this information on the server.
    '''
    try:
        prompt = request.json['prompt']
        url = request.json['url']
        user =  request.json['email']

        if(url is None or url == ''):
            response = make_response(jsonify({"error": "The user did not provide the image URL to submit!"}))
            response.status_code = 403
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            return response

        if(prompt is not None):
            isProfaneText = profanity.contains_profanity(prompt)

            if(isProfaneText):
                print(f'{user} requested an image of {prompt}. This requested was deemed inappropriate or profane.')
                response = make_response(jsonify({"error": "The user's request contained offensive or profane content. Please retry with an appropriate request.",}))
                response.status_code = 403
                response.headers.add('Access-Control-Allow-Origin', '*')
                response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                return response
            
        image_id = uuid.uuid4() 
        was_add_successful = add_contest_image(ContestImage(image_id, url, user, prompt, 0))

        if(was_add_successful):
            response = make_response(jsonify({"message": "Successfully added new image!"}))
            response.status_code = 200
        else: 
            response = make_response(jsonify({"message": "Could not add new image!"}))
            response.status_code = 500    

    except Exception as e:
        response = make_response(jsonify({"error": e}))
        response.status_code = 500
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@api.route('/vote', methods = ['POST'])
async def vote_for_images():
    '''
    A function which takes the user's three votes and adds them to the selected images.
    ''' 
    try:
        ids = request.json['ids']
        user =  request.json['email']

        for id in ids:
            was_vote_successful = vote_for_image(id)

            if(was_vote_successful):
                response = make_response(jsonify({"message": "Successfully added new image!"}))
                response.status_code = 200
            else: 
                response = make_response(jsonify({"message": "Could not add new image!"}))
                response.status_code = 500    

    except Exception as e:
        response = make_response(jsonify({"error": e}))
        response.status_code = 500
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@api.route('/final-scores', methods = ['GET'])
async def sort_by_score():
    '''
    A function which returns the top three images by votes.
    '''
    try:
        top_scores = get_top_scores()

        if(top_scores):
            response = make_response(jsonify({"podium": top_scores}))
            response.status_code = 200         
        else: 
            response = make_response(jsonify({"message": "Could not get top scoring images!"}))
            response.status_code = 500    

    except Exception as e:
        response = make_response(jsonify({"error": e}))
        response.status_code = 500
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@api.route('/contest-entries', methods = ['GET'])
async def get_contest_entries():
    '''
    A function which returns the list of all contest entries.
    '''
    try:
        entries = get_all_entries()

        if(entries):
            response = make_response(jsonify({"entries": entries}))
            response.status_code = 200         
        else: 
            response = make_response(jsonify({"message": "Could not get contest entries!"}))
            response.status_code = 500    
        

    except Exception as e:
        response = make_response(jsonify({"error": e}))
        response.status_code = 500
    
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response    