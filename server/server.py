from flask import Flask, request, jsonify
from server.functions.translation import translate_to_german

app = Flask(__name__)

@app.route('/translate/german', methods=['POST'])
def translate_german():
    jsonData = request.json
    print(jsonData)
    if not jsonData:
        return jsonify({"error": "No data provided"}), 400
    translated = translate_to_german(jsonData)
    return jsonify(translated)


if __name__ == '__main__':
    app.run(debug=True)