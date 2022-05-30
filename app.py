from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from decouple import config

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config("MYSQL_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# declare the table
class Subscriber(db.Model):
    phone_num = db.Column("phoneNumber", db.String(45), primary_key=True)
    username = db.Column("username", db.String(45), nullable=False)
    password = db.Column("password", db.String(45), nullable=False)
    domain = db.Column("domain", db.String(150), nullable=False)
    status = db.Column("status", db.String(45), nullable=False)
    features = db.Column("features", db.String(150), nullable=False)

    def __repr__(self) -> str:
        return f"<Subscriber {self.username} | Phone # {self.phone_num}"

class SubscriberSchema(ma.Schema):
    class Meta:
        fields = ("phone_num", "username", "password", "domain", "status", "features")

subscriber_schema = SubscriberSchema()
subscribers_schema = SubscriberSchema(many=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get/", methods = ["GET"])
def get_all():
    all_subs = Subscriber.query.all()
    sub_results = subscribers_schema.dump(all_subs)
    return jsonify(sub_results)

if __name__ == "__main__":
    app.run()