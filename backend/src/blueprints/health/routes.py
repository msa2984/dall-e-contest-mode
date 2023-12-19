from flask import Blueprint, jsonify
import os, sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from services.open_ai_service import verify_openai_connection

health = Blueprint('health', __name__, url_prefix="/health")

@health.route('/app', methods = ['GET'])
def app_health_check(): 
    '''
    A basic health check. It returns True in all scenarios
    where the REST service is reachable.
    '''
    return jsonify({'isServiceRunning': True});

@health.route('/dependencies', methods = ['GET'])
async def dependency_health_check(): 
    '''
    A health check for the REST API's dependencies.
    Currently, returns True if OpenAI is reachable. 
    Otherwise, returns False.
    '''
    is_open_ai_image_generator_available = await verify_openai_connection()
    return jsonify({'areDependenciesAvailable': is_open_ai_image_generator_available});