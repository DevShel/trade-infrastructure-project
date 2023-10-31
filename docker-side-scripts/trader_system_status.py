from scapy.all import *
import time
import pymongo
from pymongo import MongoClient
from pymongo import collection
from bson import ObjectId

# Connec to MongoDB
cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["status"]


def setModeToRecording():
    # Get current status mode and change it to the opposite mode
    currStatus = collection.find_one().get('status')
    if (currStatus == "recording"):
        # Received request to stop recording, setting system back to normal
        collection.update_one({"status": "recording"}, { "$set": {"status": "normal"}});
    elif (currStatus == "normal"):
        # Received request to start recording, putting system into recording mode
        collection.update_one({"status": "normal"}, { "$set": {"status": "recording"}});
    time.sleep(2)
'''
Sniff packets using Scapy, filtering traffic by port 8080
When the "record" button is pressed on the frontend, it sends a small amount of traffic to port 8080
This packet sniffer listens for this traffic, and changes the flag of the database accordingly
'''
t = AsyncSniffer(filter="dst port 8080", prn = lambda x: setModeToRecording())

t.start()

while True:
    time.sleep(1)

t.stop()
