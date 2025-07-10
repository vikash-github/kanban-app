export const initialLists =  
    [
      {
        id: 'list-todo',
        title: 'Todo',
        tasks: [
            { id: '1', title: 'Task 1', description: 'To do task 1' },
            { id: '2', title: 'Task 2', description: 'To do task 2' },
        ],
      },
      {
        id: 'list-doing',
        title: 'Doing',
        tasks: [
            { id: '3', title: 'Task 3', description: 'Doing task 3' },
            { id: '9', title: 'Task 9', description: 'Doing task 9' },

        ],
      },
      {
        id: 'list-done',
        title: 'Done',
        tasks: [
            { id: '4', title: 'Task 43', description: 'Done task 4Done task 4' },
            { id: '5', title: 'Task 5T', description: 'Done task 5 ' },
            { id: '6', title: 'Task 6', description: 'Done task 6' },
            { id: '7', title: 'Task 7', description: 'Done task 7' },
            { id: '8', title: 'Task 8', description: 'Done task 8' },
        ],
      },
    ];
export const listOrder = ['list-todo', 'list-doing', 'list-done'];
