from revChatGPT.V1 import Chatbot
from flask import *
from dotenv import load_dotenv
import os
from flask_cors import CORS
load_dotenv()


EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

# customized prompts
ENGLISH_TO_EMOJIS_PROMPT = '''I want you to act as an emoji translator, 
    I will provide you sentence that does contain emojis, 
    and it is your job to rewrite the sentence into a sentence with no emojis and just English, 
    You will keep the original meaning of the text, and you will translate the emojis into English that expresses the users feelings,
    You may not change anything if no emoji is found. Do convert everything inito English. 
    You will only provide the translated sentence and nothing else, no explanations. 
    However, if there is no emojis in the sentence, you will translate the sentence into all emojis without asking or stating.
    My first sentence for you to to translate into text mixed emojis is:'''

PROMPT_TO_EMOJIS_PROMPT = '''_______PLACE_HOLDER_TO_BE_FILLED_______'''

app = Flask(__name__)
CORS(app)

# Access to ChatGPT
chatbot = Chatbot(config={
    "email": EMAIL,
    "password": PASSWORD
})

# initialize a chat window and get the session id
for data in chatbot.ask("hello."):
    None
conversation_id = chatbot.get_conversations()[0]["id"]


# listen to server_url/translate
@app.route('/translate', methods=['POST'])
def translate():
    if request.is_json:
        data = request.get_json()
        user_input = data.get('user_input')
        # translation method, from english to emojis or the other way around. 
        method = str(data.get('method'))
        
        if not user_input:
            return jsonify({'message': 'Bad Request: user_input parameter is missing'}), 400

        # default from english to emojis
        prompt = ENGLISH_TO_EMOJIS_PROMPT;
        if method.lower() == 'emoji_to_english':
            prompt = PROMPT_TO_EMOJIS_PROMPT

        response = ""
        for data in chatbot.ask(f'{prompt} {user_input}', conversation_id):
            response = data["message"]

        return jsonify({'message': response})
    else:
        return jsonify({'message': 'Bad Request: Invalid JSON payload'}), 400


if __name__ == "__main__":
    app.run(debug=True)