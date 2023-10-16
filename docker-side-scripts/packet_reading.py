from scapy.all import *
import time
import pymongo
from pymongo import MongoClient
from pymongo import collection


cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["all-trades"]



def post_data(packetString, time_received):
    parsed_array = packetString[2:-2].split('-');
    print("Posting trade " + str(parsed_array) + " to MongoDB")
    post = {
    "amount": parsed_array[2],
    "latency": (time_received - float(parsed_array[3]))*1000 ,
    "fromCurrency": parsed_array[0],
    "toCurrency": parsed_array[1]
    }
    collection.insert_one(post)


t = AsyncSniffer(filter="icmp", prn = lambda x: post_data(str(x.payload[2]), time.time()))

t.start()

while True:
    time.sleep(1)

t.stop()