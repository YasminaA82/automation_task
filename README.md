-Playwright framework with javascript
-There is an end-to-end-tests folder and an api-tests folder.

-This is not an exhaustive test suite and only some tests have negative testing and happy paths.

end-to-end-tests: used the page object model and tests-data 
-The pages folder contains some of the pages like branding, login, rooms and home page
-The tests-data contains json files with data to be used in the tests
known issue:
-The tests that need to use the fillBookingForm  and fillContactForm defined in homePage.js are failing when trying to fill the fields, I’m not sure if there is a protection/block on the fields, the selector works as it finds the correct field and clicks on it, but fails to type the information.

api-tests : Arranged by end-point and each end-point contains a data file if needed.
known limitation:
--The api test for PUT /branding is failing as it requires the admin role to execute that method, the x-auth-token is not exposed.


Please note : 
I didn’t manage to run the application (platfrom repo) due to the jar file not being located or access the api documentation due to "no main manifest attribute".
