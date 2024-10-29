# Task Manager API
The Task Manager API is a RESTful service for managing tasks, including creating, reading, updating, and deleting tasks. This API helps users organize tasks efficiently with features like task status, due dates, and categories.


## Getting Started
### Prerequisites
- Node.js (version 14+)
- express (version 4.21+)
- Mongoose (version 8.7+)
- axios (version 1.7+)
- body-parser (version 1.20+)
- dotenv (version 16.4+)
- ejs (version 3.1+)
- moment (version 2.30+)
- nodemon (version 3.1+)

### Installation
1. Clone the repository:
   
   git clone https://github.com/AbhishekMalkhedkar/task-projectt.git

2. Install dependencies:
	
	(terminal) - run

		     cd task-manager-api
		     npm install

3. How to run
		
	(terminal) - run 
		
		     nodemon server.js


4. Testing API

	* You can Test API using Postman client

	## API Endpoints
	
	### 1. Create Task - 

		- **URL**: `http://localhost:5000/api/tasks`
		- **Method**: POST
		- **Description**: Creates a new task.
		- **Request Body**:
  		  ```json

		the body must contain : 
					 {
  						"title": "title",
 						"description": "description",
  						"status": "pending" || "in-progress" || "completed", 
  						"dueDate": "DD-MM-YYYY"
					 }
		- Response
				
					{
        					"_id": "6718cda0812a8f27fdda86fb",
        					"title": "Test Api",
        					"description": "Testing Api is very imp",
        					"status": "pending",
        					"dueDate": "24-10-2024",
        					"createdAt": "2024-10-23T10:19:12.392Z",
        					"updatedAt": "2024-10-23T10:19:12.392Z",
        					"__v": 0
    					}

	
	### 2. Get All Tasks - 
		
		- **URL**: `http://localhost:5000/api/tasks`
		- **Method**: GET
		- **Description**: Get all tasks.

		- Response 
				[ { task1 } , { task2 }, .,.,.,.,. ]

	### 3. Get Task by ID -

		- **URL**: `http://localhost:5000/api/tasks/:id`
		- **Method**: GET
		- **Description**: Get task by ID.
		- **Request path variable**:
		  
		   must contain id - example { id = 6718cda0812a8f27fdda86fb }

		- Response 
					{
        					"_id": "6718cda0812a8f27fdda86fb",
        					"title": "Test Api",
        					"description": "Testing Api is very imp",
        					"status": "pending",
        					"dueDate": "24-10-2024",
        					"createdAt": "2024-10-23T10:19:12.392Z",
        					"updatedAt": "2024-10-23T10:19:12.392Z",
        					"__v": 0
    					}
	
	### 4. Get Task by dueDate -

		- **URL**: `http://localhost:5000/api/tasks?dueDate=DD-MM-YYYY`
		- **Method**: GET
		- **Description**: Get task by dueDate.
		- **Request params**:
		
		   request parameter must contain dueDatev - example { dueDate = DD-MM-YYYY }

		- Response 
					
					[ { task1 } , { task2 }, .,.,.,.,. ]

	### 5. Get Task by status -

		- **URL**: `http://localhost:5000/api/tasks?status=pending`
		- **Method**: GET
		- **Description**: Get task by status.
		- **Request params**:
		
		  request parameter must contain status - example { status = "pending" or "in-progress" or "completed" }

		- Response
					[ { task1 } , { task2 }, .,.,.,.,. ]

	### 6. Get Task by status and dueDate -

		- **URL**: `http://localhost:5000/api/tasks?status=pending&dueDate=DD-MM-YYYY`
		- **Method**: GET
		- **Description**: Get task by status and dueDate.
		- **Request params**:

		  request parameter must contain status and dueDate - example { status = "pending" or "in-progress" or "completed",											dueDate = DD-MM-YYYY }
	
		- Response
					[ { task1 } , { task2 }, .,.,.,.,. ]

	### 7. Update Task -
		  
		- **URL**: `http://localhost:5000/api/tasks/:id`
		- **Method**: PUT
		- **Description**: Update task by ID.
		- **Request path variable**:

		 param must contain id - example { id = 6718cda0812a8f27fdda86fb
                  the body must contain - {
						"title": "title",
  						"description": "description",
 						"status": "in-progress || pending || completed",
  						"dueDate": "DD-MM-YYYY"
					  }
					    }

		- Response 
					{
        					"_id": "6718cda0812a8f27fdda86fb",
        					"title": "Test Api",
        					"description": "Testing Api is very imp",
        					"status": "pending",
        					"dueDate": "24-10-2024",
        					"createdAt": "2024-10-23T10:19:12.392Z",
        					"updatedAt": "2024-10-23T10:19:12.392Z",
        					"__v": 0
    					}
	
	### 8. Delete Task

		- **URL**: `http://localhost:5000/api/tasks/:id`
		- **Method**: DELETE
		- **Description**: Delete task by ID.
		- **Request path variable**:

		  must contain id - example { id = 6718cda0812a8f27fdda86fb }

		- Response 
					{
   						"message": "Task deleted"
					}

	
	* You can Test API using basic UI

		- How to run
	
			(Terminal) run - 
			
			1st terminal -	nodemon server.js
			2nd terminal -  nodemon index.js

			* Go to browser and hit localhost:3000
