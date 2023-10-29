from scapy.all import *
import time
import pymongo
from pymongo import MongoClient
from pymongo import collection
from bson import ObjectId


cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["status"]


def setModeToRecording():
    print ("Setting status to recording")
    currStatus = collection.find_one().get('status')
    if (currStatus == "recording"):
        collection.update_one({"status": "recording"}, { "$set": {"status": "normal"}});
    elif (currStatus == "normal"):
        collection.update_one({"status": "normal"}, { "$set": {"status": "recording"}});
    wait(3)

    



t = AsyncSniffer(filter="dst port 8080", prn = lambda x: setModeToRecording())

t.start()

while True:
    time.sleep(1)

t.stop()
