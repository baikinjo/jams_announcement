## logger.js
* * *
 This is a middleware that writes activity log to /logs/activity.log

    [timestamp] [method] [status] [URL] [user email] [ms] 

 On linux system, type following command to monitor logs in realtime

    tail -f ./activity.log