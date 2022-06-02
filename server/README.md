# Insert data with ORM Sequelize

To perform inserting record data to specific table with ORM Sequelize, we can use method `create()` from our model. For example, we do it using user model.  
Remember all of sequelize model operation is asynchronous.  

For a simple example:  
```javascript
const { user } = require('../../models')

try {
  const createdData = await user.create(data);
  console.log(createdData);
} catch(err) {
  console.log(err)
}
```  

References: [Insert data with Sequelize](https://sequelize.org/master/manual/model-querying-basics.html)