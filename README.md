This tool was created to track the network latency when sending trading information between two docker containers running Ubuntu.

The 1st Docker container (Exchange) sends information into a network over ICMP. Another docker container (the trader) then reads this information and sends it to a MongoDB database.

The frontend is built with NextJS, using TypeScript. A Rest API was built in NextJS to query the MongoDB database repeatedly, in order to load data about latency.
