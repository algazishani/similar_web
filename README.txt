To run the app: 
go to the main app folder - and run "dotnet run".
The output will show the localhost it is listing on to 
(https://localhost:5001/ - open chrome on that port) 

Please note: 

# I implemented BE tests insead of FE tests (accidentally) -  to run them "dotnet test"

# No proper error handling was done in the given time. 
No action is taken when a server return a error code 
(besides console.log, with more time i would add error handling function
that takes care of retries and pops up a snackbar when failing )

Bonus:
# getMoreInfo() in the ClientApp\Playliset.service is a function that was
writing to get the title and duration of a video using the google key,
after couple of tries, i have reached my limited daliy access, so i can't debug
it any farther. (I deleted the key from the code as it sensitive information)

# Deleting an item from the list - triggring a new loading of a video to the yooutube player - 
bug - when givin more time easy to solve. 
