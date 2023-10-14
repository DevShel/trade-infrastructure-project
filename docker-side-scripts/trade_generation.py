from scapy.all import *


send(IP(src="172.18.0.2", dst="172.18.0.1")/ICMP()/"HI")