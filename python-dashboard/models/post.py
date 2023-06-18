from database import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True)
    content = db.Column(db.Text)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __init__(self, title, content, author_id):
        self.title = title
        self.content = content
        self.author_id = author_id