from scapy.all import *
import time

t = AsyncSniffer(prn=lambda x: x.show())
t.start()

time.sleep(15)

t.stop()