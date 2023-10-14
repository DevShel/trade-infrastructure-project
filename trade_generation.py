from scapy.all import *


packet = IP(dst="129.2.192.43")/TCP()/"SHELDON" 
send(packet)