''' 
This is the background service that continuously runs on the ec2 server in the background.
When this script detects that the flag has changed to recording, it uses the os module to run a systemd systemctl command
which starts the trade logging script. When it detects that the flag has been set to normal mode, 
it turns off the process.
'''

import time
import pymongo
from pymongo import MongoClient
from pymongo import collection
import os


cluster = MongoClient(
    'mongodb+srv://sheldon:vkc6eqg*CTN!pfa.eyp@trade-infrastructure-cl.xf3vgdx.mongodb.net/trades?retryWrites=true&w=majority')
db = cluster["trades"]
collection = db["status"]


def getRecordingMode():
    currStatus = collection.find_one().get('status')
    if (currStatus == "recording"):
        status = os.system('sudo systemctl is-active --quiet log_trades.service')
        if (status == 0):
            print("Recording is running properly")
        else:
            print ("Service has been set to recording, starting recording service")
            os.system('sudo systemctl start log_trades.service')
        
    elif (currStatus == "normal"):
        status = os.system('sudo systemctl is-active --quiet log_trades.service')
        if (status == 0):
            print("Stop recording requested, stopping recording service.")
            os.system('sudo systemctl stop log_trades.service')
            
        else:
            print ("Recording is not running, so I will do nothing")
          
    


while True:
    getRecordingMode()
    time.sleep(2)
