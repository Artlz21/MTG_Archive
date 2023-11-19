from flask import Flask, render_template, redirect
from flask_restful import Api
from api.cards import CardsResource, CardSearch

app = Flask(__name__)
api = Api(app)

@app.route('/')
def hello():
    return redirect('/home')

# use <> for variables it will use the end portion of the href from anchors(a)
@app.route('/home')
def home():
    return render_template('index.html')

api.add_resource(CardsResource,'/api/cards')
api.add_resource(CardSearch,'/api/cardsearch')
