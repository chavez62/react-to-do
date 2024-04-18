# TodoList Component 

![react-1-logo-png-transparent](https://github.com/chavez62/react-to-do/assets/67764701/4440ae25-3aec-4028-872e-eb7bf3273657)



The TodoList component is a React functional component designed to manage a simple to-do list application. It allows users to interact with a list of tasks in several ways:

## Features
+ Add Tasks: Users can input tasks through a text field and add them to the list by clicking the 'Add Task' button. Each task is stored in an array in the component's state.
+ Delete Tasks: Each task in the list comes with a 'Delete' button that allows users to remove tasks. The tasks are filtered by index, and the state is updated to reflect this change.
+ Reorder Tasks: Tasks can be moved up or down in the list using the '☝' and '👇' buttons, respectively. This is accomplished by swapping the positions of the tasks in the array based on their current indices.
+ State Management: The component utilizes React's useState hook for state management, keeping track of all tasks and the current input from the user.
  
## Implementation Details
### State Variables:
+ tasks: An array of tasks.
+ newTask: A string representing the current input from the user.
  
### Functions:
+ handleInputChange: Updates newTask based on user input.
+ addTask: Adds a new task to the tasks array and resets the input field.
+ deleteTask: Removes a task based on its index.
+ moveTaskUp and moveTaskDown: Adjust the order of tasks within the list by modifying their indices in the tasks array.
  
This component provides a basic yet functional to-do list experience, demonstrating the core concepts of React such as component-based architecture, state management, and handling user interactions.

![image](https://github.com/chavez62/react-to-do/assets/67764701/ae714501-2ecb-404d-95e8-d0a32edce1a0)
