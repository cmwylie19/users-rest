```
curl -X PUT -H "Content-Type: application/json" -d '{"lists":[1,2,3],"friends":["Jenkins"],"_id":"602678a0342dd1fbfa62265f"}' http://localhost:8081/user

 curl -X POST -H "Content-Type: application/json" -d '{"name":"Jenkins","email":"jenkins@ncsu.edu"}' http://localhost:8081/user


curl -X GET -H "Content-Type: application/json" -d '{"lists":[],"friends":["[Jenkins"],"email":"jenkins@ncsu.edu"}' http://localhost:8081/user/jenkins@ncsu.edu

 curl -X GET -H "Content-Type: application/json" -d '{"lists":[1,2,3],"friends":["Jenkins"],"email":"jenkins@ncsu.edu"}' http://localhost:8081/user  

 curl -X DELETE -H "Content-Type: application/json" -d '{"email":"casey.wylie@solo.io"}' http://localhost:8081/user

```
