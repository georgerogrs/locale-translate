from flask import Flask, request, jsonify
from functions.translation import translate

app = Flask(__name__)

@app.route('/translate/<lang_code>', methods=['POST'])
def translate_input(lang_code):
    if not lang_code:
        return jsonify({"error": "No language code provided"}), 404
    jsonData = request.json
    if not jsonData:
        return jsonify({"error": "No data provided"}), 400
    translated = translate(jsonData, lang_code)
    return jsonify(translated)


if __name__ == '__main__':
    app.run(debug=True)