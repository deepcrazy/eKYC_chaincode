**Install**
```
peer chaincode install -l node -n eKYC -v 1.2 -p /opt/gopath/src/github.com/chaincode/eKYC/javascript/
```

**Instantiate**
```
peer chaincode instantiate -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n eKYC -v 1.2 -c '{"Args":["initLedger"]}' -P "OR ('Org1MSP.member','Org2MSP.member')"
```

**Upgrade**
```
peer chaincode upgrade -o orderer.example.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n eKYC -v 1.2 -c '{"Args":["initLedger"]}' -P "OR ('Org1MSP.member','Org2MSP.member')"
```

**Invoke** (InputData Function)
##### Preferred way:
```
peer chaincode invoke -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n eKYC -c '{"Args":["inputData","USERX1","{firstName:Deep,lastName:Gupta}"]}'
```
``Output (on CouchDB)``
```
{
  "_id": "USERX1",
  "_rev": "2-6078b3400a86cffef56696649ed71c09",
  "user": "{firstName:Deep,lastName:Gupta}",
  "~version": "\u0000CgMBBwA="
}
```
##### Alternate way:
```
peer chaincode invoke -o orderer.example.com:7050 --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n eKYC -c '{"Args":["inputData","USER1","{firstName:\"Deep\",lastName:\"Gupta\"}"]}'
```
``Output (on CouchDB)``
```
{
  "_id": "USER1",
  "_rev": "1-4b6a7f7969fe4e71ed0d3ebbf4967afb",
  "user": "{firstName:\"Deep\",lastName:\"Gupta\"}",
  "~version": "\u0000CgMBCAA="
}
```