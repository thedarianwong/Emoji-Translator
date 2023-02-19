from revChatGPT.V1 import Chatbot
from flask import *

app = Flask(__name__); 

# Access to ChatGPT
chatbot = Chatbot(config={
    "email":"hackeremoji1@gmail.com", 
    "password":"hackeremoji1@gmail.com"
}) 
chatbot.clear_conversations()

# Clear the past coversation all
# Chatbot.clear_conversations(chatbot)

# First promp to translate emojis into English
# prev_text_first = ""

# for data in chatbot.ask(
#     "No explanation, I want you to become an emoji translator. I'm going to provide a text containing emojis, and you are going to interpret the sentence and return one short English sentence that people who can't read emojis can understand. If the content is explicit, give an inexplicit response.",):

#     message = data["message"][len(prev_text_first) :]

#     prev_text_first = data["message"]


# Second promp to translate English into emojis
# prev_text_second = ""

# for data in chatbot.ask(
#     "I'll give you a text. I want you to read English sentences and decorate with suitable emojis throughout the text in random places, but it has to make sense. Also, please keep the original sentences.",):

#     message = data["message"][len(prev_text_second) :]

#     prev_text_second = data["message"]

# # First Room: Capture the id to identify which conversation user wants
# first_ID = chatbot.get_conversations()[0]["id"]
# print("First promp id: " + first_ID)

# Second Room: Capture the id to identify which conversation user wants
# second_ID = chatbot.get_conversations()[1]["id"] 
# print("Second promp id: " + second_ID)

# print(chatbot.get_msg_history(second_ID)); 

@app.route('/', methods=['POST', 'GET'])
def index():

    # Chatbot.clear_conversations(chatbot)
    while(len(chatbot.get_conversations()) > 1):
        chatbot.delete_conversation(chatbot.get_conversations()[0]["id"])

    select = request.form.get('conversion')
    # print("Option is: " + str(select))

    if request.method == 'POST':
        if request.form['submit'] == 'Transalte':

            # Get a user input to ask chatGPT
            user_input = request.form['user_input']

            # Declare array to store all values from chatGPT
            test_arr = ""

            # Access to ChatGPT and Get a response from
            prev_text = ""

            # Define which option user made 
            if (select == 'insert'): 

                for data in chatbot.ask(
                    "I'll give you a text. I want you to read English sentences and decorate with suitable emojis throughout the text in random places, but it has to make sense. Also, please keep the original sentences. The text is: " +  user_input
                ):

                    message = data["message"][len(prev_text) :]
                    test_arr += message 
            
                    prev_text = data["message"] 
                
                # Have to set up error msg later 
                return render_template('index.html', test_arr = test_arr, user_input = user_input)

            else: 

                for data in chatbot.ask(
                    "No explanation, I want you to become an emoji translator. I'm going to provide a text containing emojis, and you are going to interpret the sentence and return one short English sentence that people who can't read emojis can understand. If the content is explicit, give an inexplicit response. The text is: " + user_input
                ):

                    message = data["message"][len(prev_text) :]
                    test_arr += message 
            
                    prev_text = data["message"] 
            

                # First promp error msg (Translate emojis into words)
                if("I'm sorry, but that text contains explicit content" in test_arr):
                    test_arr = "Error (Explicit Content)"

                # First promp error msg (Translate emojis into words)
                elif ("doesn't have a commonly recognized meaning in English" in test_arr):
                    test_arr = "Error (Explicit Content)"
                
                
                return render_template('index.html', test_arr = test_arr, user_input = user_input)
        
        elif request.form['submit'] == 'Clear':

            # Chatbot.clear_conversations(chatbot)

            return render_template('index.html')

    else: 
        return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)


