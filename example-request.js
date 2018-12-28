exports.createValidRequest = function () {
    var rq = {
        "CustAddInp": {
          "Session": {
            "CustId": {
              "CustIdType": "1",
              "CustIdNum": "1033260060"
            },
            "CurDt": "2018-12-19T09:56:20.442",
            "RqUID": "974"
          },
          "CustAddRq": {
            "SecretList": [{
                "SecretId": "numCard",
                "Secret": "0201",
                "CryptType": "DES"
              },
              {
                "SecretId": "password",
                "Secret": "025BFDFA8B81546F",
                "CryptType": "DES"
              }
            ],
            "CustId": {
              "CustIdType": "1",
              "CustIdNum": "1033260060"
            },
            "BankInfo": {
              "BankId": "00010016"
            },
            "ProductId": {
              "BankInfo": {
                "BankId": "00010016"
              }
            },
            "IPAddr": "10.130.2.187",
            "Channel": "PB"
          }
        },
        attributes: {
          'xmlns': "http://www.s1.com"
        }
      };

      return rq;
};


  