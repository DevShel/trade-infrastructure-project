from scapy.all import *
import random, time

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
    send((IP(src="172.18.0.3", dst="172.18.0.2")/UDP(dport=5005)/generateTrade()),iface="eth0")
    time.sleep(2)
