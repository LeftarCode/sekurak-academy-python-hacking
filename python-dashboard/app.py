from flask import Flask, request, jsonify, render_template
from database import db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_jwt_extended import current_user
from flask_cors import CORS
from flask_migrate import Migrate
from models.user import User
from models.post import Post
from sqlalchemy import text
import hashlib
import requests
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@postgres/user'
app.config['JWT_SECRET_KEY'] = 'secret_key'

db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
CORS(app)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    sql = text(f"""SELECT * FROM "user" WHERE id='{identity}'""")
    result = db.session.execute(sql)

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


@app.route('/posts', methods=['GET'])
def get_posts():
    username = request.args.get('username')
    posts = []
    if username != None:
        user = User.query.filter_by(username=username).one_or_none()
        posts = Post.query.filter_by(author_id=user.id).all()
    else:
        posts = Post.query.all()
    return jsonify({"posts": [post.serialized for post in posts]}), 200

@app.route('/posts_by_title', methods=['GET'])
def get_posts_by_title():
    title = request.args.get('title')
    posts = []

    sql = text(f"""SELECT * FROM "post" WHERE title='{title}'""")
    try:
        result = db.session.execute(sql)
    except:
        return jsonify({"error": "SQL Error"}), 500

    print(result)

    return jsonify({"posts": []}), 200

@app.route('/post', methods=['GET'])
def get_post():
    id = request.args.get('id')
    post = Post.query.filter_by(id=id).first()
    if post == None:
        return jsonify({"status": "not found"}), 404

    return jsonify({"post": post.serialized}), 200

@app.route('/post', methods=['POST'])
@jwt_required()
def create_post():
    data = request.json

    post = Post.query.filter_by(title=data.get('title')).first()
    if post != None:
        return jsonify({"status": "title must be unique"}), 400

    post = Post(data.get('title'), data.get('content'), current_user.id)
    db.session.add(post)
    db.session.commit()

    return jsonify({"status": "success"}), 200

@app.route('/me', methods=['GET'])
@jwt_required()
def me():
    return jsonify({'username': current_user.username, 'role': current_user.role}), 200

@app.route('/support', methods=['POST'])
@jwt_required()
def support():
    if (current_user.role != "admin"):
        return jsonify({'status': 'only admin'}), 403
    
    problem = request.json.get('problem')
    description = request.json.get('description')

    res = requests.post("http://support:8080/support", data={"problem": problem, "description": description})

    return jsonify({'confirmation': res.text}), 200

@app.route('/support/confirm', methods=['POST'])
@jwt_required()
def support_confirm():
    if (current_user.role != "admin"):
        return jsonify({'status': 'only admin'}), 403
    
    confirmation = request.json.get('confirmation')

    res = requests.post("http://support:8080/support/confirm", data={"confirmation": confirmation})

    return jsonify({'status': res.text}), 200

if __name__ == '__main__':
    app.run()