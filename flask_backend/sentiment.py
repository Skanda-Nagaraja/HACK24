from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax

tweet = "the weather is nice today"

words = []

for word in tweet.split(' '):
    if word.startswith('@') and len(word) > 1:
        word = '@user'
    
    elif word.startswith('http'):
        word = "http"
    words.append(word)


processed = " ".join(words)
print(words)

#load model
roberta = "cardiffnlp/twitter-roberta-base-sentiment"

model = AutoModelForSequenceClassification.from_pretrained(roberta)

tokenizer = AutoTokenizer.from_pretrained(roberta)

labels = ['Negative', 'Neutral', 'Positive']

# # analysis of sentiment
encoded_tweet = tokenizer(processed, return_tensors='pt')
#output = model(encoded_tweet['input_ids'], encoded_tweet['attention_mask'])
output = model(**encoded_tweet)

scores = output[0][0].detach().numpy()
probabilities = softmax(scores)
 
for i in range(len(probabilities)): 
    print(labels[i], probabilities[i])
