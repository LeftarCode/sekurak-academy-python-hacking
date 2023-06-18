from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    role = db.Column(db.String(50))

    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role