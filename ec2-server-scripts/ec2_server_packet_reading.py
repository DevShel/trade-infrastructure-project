'''
When mode is set to recording, it reads packets from exchange_trade_generation.py
and logs them into trade_log.txt. Monit monitors if this service is running based 
on the scripts name. You can learn more about monit's configuration in the .monitrc file.
'''
from scapy.all import *

# Clear contents of file in case trades already exist
open("trade_log.txt", "w").close()

def logPayload(x, received_time):
    if (x[Raw]):
        if (x[Raw].load):
            logFile = open("trade_log.txt", "a")
            loadString = str(x[Raw].load)
            parsed_array = loadString[2:-2].split('-');
            listToStr = ' '.join([str(elem) for elem in parsed_array])
            print("Got a packet", listToStr)
            listToStr += " | Received at: "
            listToStr += str(received_time)
            logFile.write(listToStr + '\n')
            logFile.close()

t = AsyncSniffer(filter="udp and host 50.169.94.141", prn = lambda x: logPayload(x, time.time()))

t.start()

while True:
    time.sleep(1)

t.stop()