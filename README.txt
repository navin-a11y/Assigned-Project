REQUIREMENT: 
    - nodeJS && npm need to be installed on your system
    - mongodb need to be installed OR you can put mongodb cloud URL connection link
    
STEPS:
    - Extract zip file
    - Go to project root folder
    - Change mongodb url(MONGODB_URI) in config.env
    - Run <npm install> command on your CMD/Terminal
    - Run <npm start> command on your CMD/Terminal, now your node server started
    - Open postman & follow below steps

        Step 1:
            NOTE:
                A. user sign in is mandatory
                B. URL must be your localhost with port(eg localhost:3333) or IP address
            
            API: <URL>/api/v1/signIn
            Req Param: {name: "Navin", password: "qazplm@2020"} 
            Res Params: { "status": 1, "message": "Logged In Successfully!!", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjU4NzBmMzJkNTFhNjE4NTBiYjkyNGEiLCJpYXQiOjE1OTk2MzMzNTksImV4cCI6MTYwMzIzMzM1OX0.iiSOFY8OrqymZ7mgCvepkiIOtzQZG0INTpqaDaaNmWY" }
        
        Step 2:
            Note:
                A. Now create order by entering only sub-total field.

            API: <URL>/api/v1/createOrder
            Req param: {sub_total} 
            Res Param: { "status": 1, "message": "Successfully updated" }

        Step 3:
            Note:
                A. Enter the below mentioned API for showing list of users

            API: <URL>/api/v1/listOrderByValue
            Req param: none
            Res Param: { "status": 1, "message": "Record successfully fetched", "data": [ { "userId": "5f57126488165915e8a39807", "name": "Niru", "noOfOrders": 5, "averageBillValue": "471.00" }, { "userId": "5f57269e00363e2420206b0b", "name": "Navin", "noOfOrders": 4, "averageBillValue": "600.00" }, { "userId": "5f587680d45dd73adce2469b", "name": "Ankit-4", "noOfOrders": 1, "averageBillValue": "700.00" }, { "userId": "5f5870f32d51a61850bb924a", "name": "Ankit-1", "noOfOrders": 2, "averageBillValue": "385.00" } ] }