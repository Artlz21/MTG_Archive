from flask_restful import Resource, request 
from flask import jsonify
import requests

class CardsResource(Resource):
    def get(self):
        response = requests.get('https://api.magicthegathering.io/v1/cards')
        return jsonify(response.json()['cards'])

class CardSearch(Resource):
    def get(self):
        searchBar = request.args.get('searchBar')
        manaCost = request.args.get('manaCost')
        color = request.args.getlist('colors')
        color = '|'.join(color)
        
        if (manaCost is None or manaCost == 'Mana Cost'):
            manaCost = 0
        else:
            manaCost = int(manaCost)

        if (searchBar):
            response = requests.get(f'https://api.magicthegathering.io/v1/cards?name={searchBar}')
            return jsonify(response.json()['cards'])
        elif (manaCost > 0 and not color):
            response = requests.get(f'https://api.magicthegathering.io/v1/cards?cmc={manaCost}')
            return jsonify(response.json()['cards'])
        elif (0 == manaCost and color):
            response = requests.get(f'https://api.magicthegathering.io/v1/cards?colorIdentity={color}')
            return jsonify(response.json()['cards'])
        elif (manaCost > 0 and color):
            response = requests.get(f'https://api.magicthegathering.io/v1/cards?colorIdentity={color}&cmc={manaCost}')
            return jsonify(response.json()['cards'])
        else:
            response = requests.get(f'https://api.magicthegathering.io/v1/cards')
            return jsonify(response.json()['cards'])
