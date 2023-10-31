'''
Listens for random UDP payloads from exchange and logs them into MongoDB 
"all-trades" collection
'''
from scapy.all import *
import time
import pymongo
from pymongo import MongoClient
from pymongo import collection

# Connect to MongoDB
cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["all-trades"]

# Post trade from port 5005 to MongoDB
def post_data(packetString, time_received):
    parsed_array = packetString[2:-2].split('-');
    print("Posting trade " + str(parsed_array) + " to MongoDB")
    post = {
    "amount": parsed_array[2],
    # Calculate difference in Unix Timestamps (both docker images are on same system)
    # This means they share a UNIX timestamp, making the calcualtions accurate
    "latency": (time_received - float(parsed_array[3]))*1000 ,
    "fromCurrency": parsed_array[0],
    "toCurrency": parsed_array[1]
    }
    collection.insert_one(post)

# Sniff packets using Scapy, filtering traffic by UDP and port 5005
t = AsyncSniffer(filter="udp and dst port 5005", prn = lambda x: post_data(str(x.payload[2]), time.time()))

t.start()

while True:

    time.sleep(1)

t.stop()
