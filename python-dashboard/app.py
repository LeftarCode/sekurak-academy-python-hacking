from flask import Flask, request, jsonify
from database import db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_jwt_extended import current_user
from flask_migrate import Migrate
from models.user import User
import hashlib

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/user'
app.config['JWT_SECRET_KEY'] = 'secret_key'
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.password == hashlib.md5(password.encode("utf-8")).hexdigest():
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(current_user.role), 200

if __name__ == '__main__':
    app.run()