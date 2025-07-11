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
          { id: '3', title: 'Very long task title. Title can be long. It should look fine on page.', description: 'Doing task 3' },
          { id: '9', title: 'Task 9', description: 'Doing task 9' },

        ],
      },
      {
        id: 'list-done',
        title: 'Done',
        tasks: [
          { id: '8', title: 'Task 8', description: 'Very long decsrption. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum' },
          { id: '4', title: 'Task 43', description: 'Done task 4Done task 4' },
          { id: '5', title: 'Task 5T', description: 'Done task 5 ' },
          { id: '6', title: 'Task 6', description: 'Done task 6' },
          { id: '7', title: 'Task 7', description: 'Done task 7' },
        ],
      },
    ];
export const listOrder = ['list-todo', 'list-doing', 'list-done'];
