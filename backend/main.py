from revChatGPT.V1 import Chatbot
from flask import *
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

app = Flask(__name__)
CORS(app)

# Access to ChatGPT
chatbot = Chatbot(config={
    "email": EMAIL,
    "password": PASSWORD
})

prev_text = ""


for data in chatbot.ask(
        "I want you to act as an emoji translator, I will provide you sentence that does not contain emojis, and it is your job to provide rewrite the sentence with suited emojis, You will keep the original text, and you may replace words with emojis if necessary, you may not change anything if no emoji is needed. Do not convert everything inito emojis, only add the minimum number amount of emojis if you connsider necessary and suit the context. You will only provide the translated sentence and nothing else, no explanations.",):
    message = data["message"][len(prev_text):]

    prev_text = data["message"]

conversation_id = chatbot.get_conversations()[0]["id"]

@app.route('/translate', methods=['POST'])
def translate():
    user_input = request.json['user_input']

    # Declare array to store all values from chatGPT
    test_arr = ""

    # Access to ChatGPT and Get a response from
    prev_text = ""
    for data in chatbot.ask(user_input, conversation_id):
        message = data["message"][len(prev_text):]
        test_arr += message
        prev_text = data["message"]

    return jsonify({'message':"ERROR TJUST AKSD TEST!"})

if __name__ == "__main__":
    app.run(debug=True)