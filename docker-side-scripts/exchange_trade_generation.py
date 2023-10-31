from scapy.all import *
import random, time
import pymongo
from pymongo import MongoClient
from pymongo import collection
from bson import ObjectId

cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["status"]



currencyArray = ['USD','EUR','JPY','GBP','AUD','CAD','CHF','CNY','SEK','MXN','NZD','SGD'
,'HKD','NOK','KRW','TRY','INR','RUB','BRL','ZAR','DKK','PLN','TWD','THB','MYR'];

# Join trade with syntax: fromCurrency-toCurrency-Amount_of_fromCurrency-UNIX_TimeStamp
def generateTrade():
    currUnixStamp = time.time()
    currency1 = random.randint(0,24)
    currency2 = random.choice([i for i in range(0,24) if i not in [currency1]])

    output = "".join(

        [
        currencyArray[currency1],
        '-',
        currencyArray[currency2],
        '-',
        str(random.randint(1000,9999)),
        '-',
        str(currUnixStamp)
        ])
    print("Sending packet: ", output)
    return output

while True:
    currStatus = collection.find_one().get('status')
    print("Current system status: ", currStatus)
    if (currStatus == "recording"):
        send((IP(dst="18.118.122.109")/UDP(dport=RandShort())/generateTrade()))
    elif (currStatus == "normal"):
        send((IP(src="172.18.0.3", dst="172.18.0.2")/UDP(dport=5005)/generateTrade()),iface="eth0")

    time.sleep(2)










  
