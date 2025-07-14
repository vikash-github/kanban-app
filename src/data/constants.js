// Constants for Kanban App


//Actions contants to handle all actions in the app
export const ACTIONS = {
    ADD_LIST: 'ADD_LIST',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_LIST_TITLE: 'UPDATE_LIST_TITLE',
    UPDATE_TASK: 'UPDATE_TASK',
    MOVE_TASK_UP: 'MOVE_TASK_UP',
    MOVE_TASK_DOWN: 'MOVE_TASK_DOWN',
    MOVE_TASK_NEXT_LIST: 'MOVE_TASK_NEXT_LIST',
    MOVE_TASK_PREV_LIST: 'MOVE_TASK_PREV_LIST',
}

// Constants for feature flags to enable/disable features in the app
export const FEATURE_FLAGS = {
    
    ENABLE_LIST_EDIT: false, // for updating list title
    ENABLE_LIST_ADD: false, // for adding list
}

//INtial list data for the Kanban app
//export const INITIAL_LISTr = []
export const INITIAL_LIST =  
    [
      {
        id: 'list-todo',
        title: 'Todo',
        tasks: [
            { id: '1', title: 'Task 1', description: 'To do task 1', complete: false },
            { id: '2', title: 'Task 2',  complete: true},
        ],
      },
      {
        id: 'list-doing',
        title: 'Doing',
        tasks: [
          { id: '3', title: 'Task 3.', description: 'Doing task 3', complete: false },
          { id: '9', title: 'Task 9', description: 'Doing task 9', complete: false },

        ],
      },
      {
        id: 'list-done',
        title: 'Done',
        tasks: [
          { id: '8', title: 'Task 8', description: 'Very long decsrption. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', complete: false },
          { id: '4', title: 'Task 43', description: 'Done task 4Done task 4', complete: true },
          { id: '5', title: 'Task 5T', description: 'Done task 5 ', complete: true },
          { id: '6', title: 'Task 6', description: 'Done task 6', complete: false },
          { id: '7', title: 'Task 7',  complete: false  },
        ],
      },
    ];


