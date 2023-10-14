from scapy.all import *
import time


t = AsyncSniffer(prn=lambda x: x.summary(), store=False)
t.start()

print(t)

time.sleep(15)

t.stop()