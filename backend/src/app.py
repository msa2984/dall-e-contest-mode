import os
from flask import Flask
from flask_cors import CORS
import blueprints.api.routes as api_blueprints
import blueprints.health.routes as health_blueprints
import blueprints.warmup.routes as warmup_blueprints


# Run the Flask REST API app
if __name__ == '__main__':
    # Instantiate app
    app = Flask(__name__)

    port = int(os.environ.get('PORT', 5000))

    # Register blueprints from /blueprints folder
    app.register_blueprint(api_blueprints.api)
    app.register_blueprint(health_blueprints.health)
    app.register_blueprint(warmup_blueprints.warmup)

    cors = CORS(app)

    app.run(host='0.0.0.0', port=port, debug=True)