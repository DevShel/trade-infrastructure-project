## Context

This project has two modes: normal and recording, these modes are determined based on a “status” flag in MongoDB. This status flag can be altered by clicking the record button in the front end, which is built with NextJS (TypeScript). The frontend contains two NextJS REST APIs, one for getting the 50 most recent trades, and another API used to query the status flag from the database.  -

The first part of the backend revolves around its “normal” mode. Normal mode enables the tracking of network latency by sending packet payloads between two Ubuntu-based Docker containers. In normal mode, the first “exchange” docker container sends information to a local network over UDP. The second “trader” container reads and sends it to a MongoDB database. -

The second part of the project revolves around its “recording” mode. If the system is in recording mode, then the “exchange” docker container sends trades to an AWS EC2 server. The EC2 “recording server” instance has two services: a “system status monitor” service for monitoring the database status flag and enabling the trade logging service, and a “trade logging” service for recording UDP packets into a text file. Furthermore, Monit is used to monitor whether the "trade logging" service is enabled or disabled. 

## Architecture Diagram

![](https://github.com/DevShel/trade-infrastructure-project/blob/master/trade_monitor_diagram.png?raw=true)

## Next Steps

* Use Ansible for EC2 instance auto-deployment
* Finish setting up SMTP mail server for Monit notifications from EC2 server
* Set up EC2 monitoring dashboard using Prometheus Node Exporter and Grafana
* Create (or utilize an industry-standard) method to detect and resend dropped UDP packets
* Add packet replay feature, enabling the sending of packets from the EC2 logfile at varying speeds
