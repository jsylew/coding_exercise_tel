from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from decouple import config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = config("MYSQL_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# declare the subscriber table/class
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

# declare constants
GET = "GET"
PUT = "PUT"
DELETE = "DELETE"
PHONE_NUM_LEN = 11

# declare schemas to parse data
subscriber_schema = SubscriberSchema()
subscribers_schema = SubscriberSchema(many=True)

# get all test
@app.route("/get/", methods = [GET])
def get_all():
    all_subs = Subscriber.query.all()
    sub_results = subscribers_schema.dump(all_subs)
    return jsonify(sub_results)

@app.route("/ims/subscriber/<phoneNumber>", methods = [GET])
def get_subscriber(phoneNumber):
    """
    Get subscriber identified by provided phont number.
    :return: json
    """
    sub = Subscriber.query.filter_by(phone_num=phoneNumber).first_or_404()
    result = subscriber_schema.dump(sub)
    return jsonify(result)

@app.route("/ims/subscriber/<phoneNumber>", methods = [PUT])
def put_subscriber(phoneNumber):
    """
    Add or update a subscriber identified by the provided phone number.
    :return: json
    """
    # assumes all phone numbers must be 11 digits long
    if len(phoneNumber) != PHONE_NUM_LEN:
        return {
            "error": "Bad Request",
            "message": "Invalid phone number. Phone number must be 11 digits long."
        }, 400
    
    data = request.get_json()
    print(data)

    # assumes all fields are mandatory
    if not data or "phoneNumber" not in data or \
        "username" not in data or "password" not in data or \
            "domain" not in data or "status" not in data or \
                "features" not in data:
                    return {
                        "error": "Bad Request",
                        "message": "Missing fields."
                    }, 400
    
    if (not data["phoneNumber"] or data["phoneNumber"].isspace()) or \
        (not data["username"] or data["username"].isspace()) or \
        (not data["password"] or data["password"].isspace() )or \
            (not data["domain"] or data["domain"].isspace()) or \
            (not data["status"] or data["status"].isspace()) or \
                (not data["features"] or str(data["features"]).isspace()):
            return {
                "error": "Bad Request",
                "message": "All fields must be filled in."
            }, 400
    
    # check length of new phone number
    if len(data["phoneNumber"]) != PHONE_NUM_LEN:
        return {
            "error": "Bad Request",
            "message": "Invalid phone number. Phone number must be 11 digits long."
        }, 400

    sub = Subscriber.query.filter_by(phone_num=phoneNumber).first()
    # subscriber exists
    if sub:
        sub.phone_num = data["phoneNumber"]
        sub.username = data["username"]
        sub.password = data["password"]
        sub.domain = data["domain"]
        sub.status = data["status"]
        sub.features = data["features"]
    else:
        new_sub = Subscriber(
            phone_num = data["phoneNumber"],
            username = data["username"],
            password = data["password"],
            domain = data["domain"],
            status = data["status"],
            features = data["features"]
        )
        db.session.add(new_sub)
    db.session.commit()

    return {
        "success": "Subscriber updated"
    }

@app.route("/ims/subscriber/<phoneNumber>", methods = [DELETE])
def delete_subscriber(phoneNumber):
    """
    Remove the subscriber identified by the provided phone number.
    :return: json
    """
    sub = Subscriber.query.filter_by(phone_num=phoneNumber).first_or_404()
    db.session.delete(sub)
    db.session.commit()
    return {
        "success": f"Subscriber {phoneNumber} was deleted"
    }

if __name__ == "__main__":
    app.run()