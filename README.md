# LostOrFound
A task project that needs user to logged in to access data. User if authorized by means that he posted the data he can edit and delete the post(data).

#Postman HERE:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/7da8e02f84e8c737c3e0?action=collection%2Fimport)
OR

Import through URL down below:
(URL: https://www.getpostman.com/collections/7da8e02f84e8c737c3e0)


#Data Structure / Data Model
We have two data model:
  1:Data
  2:Users
  
  Data has:
    name: {type: String, required:true},
    location: {type: String, required:true},
    desc: String,
    date: {type: Date, default: Date.now},
    pictures: [String],
    found: { type: Boolean, required: true },
    user: String
    
    *required true means that field must be filled.
    
   Users has:
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
    
    *every field is required for a registering. Otherwise for login username and password is required.
 
 ----------------------------------------------------------------------------------------------------------------------
 #error messages:
    *if any wrong type data, missing data, unauthorized or any other error occurs then back-end will send
    json response with field of success, status, message, stack. Note that every error has success field that equals false. THIS
    IS TRUE FOR EVERY METHOD OF EVERY ROUTE.*

e.g : {
    "success": false,
    "status": 404,
    "message": "User not found",
    "stack": "Error: User not found\n    at createError (file:///E:/lostAndFound/api/utils/createError.js:2:17)\n    at login (file:///E:/lostAndFound/api/controllers/auth.js:30:31)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)"}
 
 #For Front-end
  *Request for every method(post, put, delete) to any route other then get should have json format data*
    
    #For User login / register 
        #post method to /api/auth/register or /api/auth/login 
      =>login and register has post method request only.

      =>register needs name, email and password to be sent in json format.
        *for successful register response with status of 201 and with text "User has been created" is sent*
      => login needs name, password. Email is optional.
        *for succesful login response with status of 200 and details field containing all data is sent*
  
      *validation of data should be done on your side.
      *if any of data is missing or other then string type of data is send from client then
        a json response with successful field equals false along with message and status is sent(for all other error this is true).
      
      *CHECK POSTMAN COLLECTION, URL PASTED ABOVE, FOR FURTHER DETAILS.*
    
    
    #For Data requests
      *User must be logged in for any data requests. Even get request. Otherwise you will be send a json object an error json object mentioned above*
      *NOTE: For every request method(get, post, put, delete) the route is same i.e /api/data/*
        
      //GETTING OR RETRIEVING DATA
       #get (fetching data)
         A get request to /api/data/ will get you an array of json object of all data(of lostOrFound) in response.
         The return will be json data with all field mentioned in data model alongside with "_id"(unique for every data)
  
       #search (retrieving specific data)
        A get request to same route mentioned above but with search field as query.
        Empty or undefined search value will get you array of json object of all data.
        Then indexed field are name, location and user(username of user who created/posted data). Which means
        any relative text search value to these field sent in query will retrieve specific data. 
        e.g /api/data/?search=pacific
        Search query with value "pacific" will return any relative text data coherent with indexed fields.
        Succesfull response will be array of json object. Unsuccessful will return empty array.
        
      //POSTING OR CREATING DATA FOR LOSTORFOUND
        #post(creating data)
        User must be logged in.
        Required fields for data should be send in json format
        
        If successful, json response of payload return from database is send.
        Payload always have "_id" you can usecase this for successfull or unsuccessful prompts.
  
      //UPDATION OR DELETION OF DATA
        #put #delete
        For updating use put, for deleting use delete method.
        Json data is send along the request.
        Both method requires "_id" field in a request, of data that is stored in database.
        It is a must that name of user logged in and user who created matches otherwise
        updation or deletion wont work.
        
        For updating other fields(you want to update) can be included in json data send on request from client along with _id.
        
        
        
      
        
      
      
