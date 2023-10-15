from scapy.all import *
import random, time

currencyArray = ['USD','EUR','JPY','GBP','AUD','CAD','CHF','CNY','SEK','MXN','NZD','SGD'
,'HKD','NOK','KRW','TRY','INR','RUB','BRL','ZAR','DKK','PLN','TWD','THB','MYR'];

# Join trade with syntax: fromCurrency-toCurrency-UNIX_TimeStamp-Amount_of_fromCurrency
def generateTrade():
    return "".join(
        [
        currencyArray[random.randint(0,24)], 
        '-', 
        currencyArray[random.randint(0,24)],
        '-',
        str(random.randint(1000,9999)),
        '-',
        str(time.time())
        ])

while True:
    send(IP(src="172.18.0.2", dst="172.18.0.1")/ICMP()/generateTrade())
    time.sleep(5)