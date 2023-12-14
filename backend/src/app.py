from flask import Flask
import blueprints.api.routes as api_blueprints
import blueprints.health.routes as health_blueprints


# Run the Flask REST API app
if __name__ == '__main__':
    # Instantiate app
    app = Flask(__name__)
    
    # Register blueprints from /blueprints folder
    app.register_blueprint(api_blueprints.api)
    app.register_blueprint(health_blueprints.health)

    app.run(debug = True)