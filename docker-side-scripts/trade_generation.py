from scapy.all import *
import random, time

currencyArray = ['USD','EUR','JPY','GBP','AUD','CAD','CHF','CNY','SEK','MXN','NZD','SGD'
,'HKD','NOK','KRW','TRY','INR','RUB','BRL','ZAR','DKK','PLN','TWD','THB','MYR'];

# Join trade with syntax: fromCurrency-toCurrency-Amount_of_fromCurrency-UNIX_TimeStamp
def generateTrade():
    currency1 = random.randint(0,24)
    currency2 = random.choice([i for i in range(0,24) if i not in [currency1]])

    return "".join(
        
        [
        currencyArray[currency1], 
        '-', 
        currencyArray[currency2],
        '-',
        str(random.randint(1000,9999)),
        '-',
        str(time.time())
        ])

while True:
    send(IP(src="172.18.0.2", dst="172.18.0.1")/ICMP()/generateTrade())
    time.sleep(2)