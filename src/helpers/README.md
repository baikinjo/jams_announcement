## Helpers
* * *
The most of helper files consist of Joi schema validation that is checked at route, before proceeding to it's conresponding controller. Helper files need to be updated when you update model because they need to reflect but Joi schema is checked at higher level.

However like it's name, if your code does not fit as controller, model, or route, wrtie it here.

### common.js
* * *
Consists passport instance and constants that are frequently used througout project
 
### route-helper
* * *
#### unique(arr, key)
 Checks if values in the given array are unique.

#### authorization(model, permission)
 Checks contact and trade permissionns. If no argument is given, it checks if role is ADMIN
 See /src/models/permission-set and ./common for more details
 
#### projectAuth(model, permission)
 Checks if user has permission to a specific project
 
#### validateBody(schema)
 *Needs info*



