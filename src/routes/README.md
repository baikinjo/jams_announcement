## Routes
* * *

 > Ajax Call from frontend => Routes (Authentication => Validation) => Controller

 All files in this directory are related to endpoints of our API. Authentication check and validation check for post parameters are done through here.
 
 The base URL is padded at index.js, so the example code below is actually routed to */contacts/*.

    // Part of /src/routes/contacts
    router.route('/')
      .get(
        passportJWT,
        authorization(CONTACT, R), // Common constants are defined at ./common.js
        contactController.index
      )
      .post(
        passportJWT,
        authorization(CONTACT, W),
        validateBody(schema.default),
        contactController.newContact
      )

 Every structure for routes is similar to the code above.

 1. Check if the user is logged in (via valid JWT token)
 2. Check if the user has a permission to "Contact" table (See user model to learn more about permission)
 3. Validates parameters with scheme (Joi validation, see here for validation)
 4. Execute the desired method via the controller.

## URL List
* * *
### Concrete Addons
* * *
URL                                                   | Type   | Function
----------------------------------------------------- | ------ | -------------
/projects/:projectId/concrete-addons                  | Get    | Get all concrete addons in a specific project
/projects/:projectId/concrete-addons                  | Post   | Create a new concrete addon
/projects/:projectId/concrete-addons/:concreteAddonId | Get    | Get a specific concrete addon
/projects/:projectId/concrete-addons/:concreteAddonId | Put    | Edit a concrete addon
/projects/:projectId/concrete-addons/:concreteAddonId | Delete | Delete a concrete addon
 
### Concretes
* * *
URL                                                   | Type   | Function
----------------------------------------------------- | ------ | -------------
/projects/:projectId/concrete                         | Get    | Get all concretes in a specific project
/projects/:projectId/concrete                         | Post   | Create a new concrete
/projects/:projectId/concrete/:concreteId             | Get    | Get a specific concrete
/projects/:projectId/concrete/:concreteId             | Put    | Edit a concrete
/projects/:projectId/concrete/:concreteId             | Delete | Delete a concrete
 
### Dailies
* * *
URL                                         | Type   | Function
------------------------------------------- | ------ | -------------
/projects/:projectId/dailies                | Get    | Get all dailies in a specific project
/projects/:projectId/dailies                | Post   | Create a new daily
/projects/:projectId/dailies/:dailyId       | Get    | Get a specific daily
/projects/:projectId/dailies/:dailyId       | Put    | Edit a daily
/projects/:projectId/dailies/:dailyId       | Delete | Delete a daily
/projects/:projectId/dailies/:dailyId/pours | Get    | Get concrete pours that has same date with a specific daily
 
### Pours
* * *
URL                                         | Type   | Function
------------------------------------------- | ------ | -------------
/projects/:projectId/pours                  | Get    | Get all pours in a specific project
/projects/:projectId/pours                  | Post   | Create a new pour
/projects/:projectId/pours/:pourId          | Get    | Get a specific pour
/projects/:projectId/pours/:pourId          | Put    | Edit a pour
/projects/:projectId/pours/:pourId          | Delete | Delete a pour
 
### Pours
* * *
URL                                       | Type   | Function
----------------------------------------- | ------ | -------------
/projects/                                | Get    | Get all pours in a specific project
/projects/                                | Post   | Create a new project
/projects/:projectId                      | Get    | Get a specific project
/projects/:projectId                      | Put    | Edit a project
/projects/:projectId                      | Delete | Delete a project
/projects/:projectId/analyze-total-pours  | Delete | Analize total pours in a specific project
 
### Images
* * *
URL                  | Type    | Function
-------------------- | ------- | -------------
/images/upload       | Post    | Upload images to temp folder (public/uploads/temp)
/images/save         | Post    | Save image to corresponding folder
/images/delete-temp  | Delete  | Delete temp images
 
### Users
* * *
URL                        | Type   | Function
-------------------------- | ------ | -------------
/users                     | Get    | Get all users
/users                     | Post   | Create a new user
/users/signin              | Post   | Create a new user
/users/send-password-reset | Post   | Sends email with a link for user to reset their password
/users/reset-password      | Post   | Resets password on password reset page
/users/:userId             | Get    | Get a specific user
/users/:userId             | Put    | Edit a user
/users/:userId             | Delete | Delete a user
 
### Trades
* * *
URL                 | Type   | Function
------------------  | ------ | -------------
/trades             | Get    | Get all trades
/trades             | Post   | Create a new trade
/trades/:tradeId    | Get    | Get a specific trade
/trades/:tradeId    | Put    | Edit a trade
/trades/:tradeId    | Delete | Delete a trade
 
### Contacts
* * *
URL                 | Type   | Function
------------------- | ------ | -------------
/contact            | Get    | Get all contacts
/contact            | Post   | Create a new contact
/contact/:contactId | Get    | Get a specific contact
/contact/:contactId | Put    | Edit a contact
/contact/:contactId | Delete | Delete a contact
 
### Permission Sets
* * *
URL                               | Type   | Function
--------------------------------- | ------ | -------------
/permission-sets                  | Get    | Get all permission sets
/permission-sets                  | Post   | Create a new permission set
/permission-sets/:permissionSetId | Get    | Get a specific permission set
/permission-sets/:permissionSetId | Put    | Edit a permission set
/permission-sets/:permissionSetId | Delete | Delete a permission set