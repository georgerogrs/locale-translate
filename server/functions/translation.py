import json
from googletrans import Translator

translator = Translator()

def validate_translated_text(text):
    validatedText = text
    if '-' in validatedText:
        textArray = validatedText.split('-')
        for item in textArray:
            if not textArray.index(item) == 0:
                if item[0].isalpha():
                    textArray[textArray.index(item)-1] = textArray[textArray.index(item)-1][0:-1]
        validatedText = '-'.join(textArray)
    if '.' in validatedText:
        textArray = validatedText.split('.')
        for item in textArray:
            if not textArray.index(item) == 0:
                if item[0] != ' ':
                    spacedItem = ' '+item
                    textArray[textArray.index(item)] = spacedItem
        validatedText = '.'.join(textArray)
    return validatedText

def translate_to_german (jsonData):
    translatedJson = {}
    for key in jsonData:
        translatedLine = translator.translate(jsonData[key], 'de')
        translatedJson[key] = validate_translated_text(translatedLine.text)
    return translatedJson
