## eKYC - Hyperledger Fabric Project

### Goal: 
Know your client (KYC) laws are a common way to protect investors and investments. However, many companies require a user to fill out the similar KYC applications over and over again. eKYC aims to solve this problem where the user is able to fill out a single KYC form, and approve the information for various companies.

A common question may be: why not just use a database that is shared between companies? The answer lies in the trust question - would another company trust other companies to not manipulate the data? The answer is commonly no. However, the Hyperledger Fabric solution allows for each company to host a record that can be checked against other company nodes to form an immutable record.

*Note: user is defined as an individual person who is submitting KYC information, where as company is an account that is used to view peoples' information.*

### Functionality

This repo is used to create the chaincode for eKYC usecase which will interact with `Hyperledger network` of 2 organisations and having 2 peers each alongwith other components like CA, CLI etc. as well.

**Objective:**
* To store the user information like `First Name, Last Name, DOB, Income, Passport` for KYC.
* To approve specific companies to access the user data for user verification 
    - Eg: If any employer has hired someone, then for employee verification, then they can access the user data after approval.
* To get the list of companies which are registered within the  network.
* To get the user data on demand by user.