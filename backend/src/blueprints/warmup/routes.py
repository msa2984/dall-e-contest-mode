import json
from flask import Blueprint


warmup = Blueprint('warmup', __name__)

@warmup.route('/warmup', methods=['GET'])
def getWarmup():
    # Perform lightweight initialization tasks here
    # Example: Pre-load necessary resources or perform initial setup
    return 'Warm-up completed successfully'
