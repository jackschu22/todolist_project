const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo from the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo from the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first todo from the list', () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last todo from the list', () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true if all todos are completed, false otherwise', () => {
    expect(list.isDone()).toEqual(false);
    list.markAllDone();
    expect(list.isDone()).toEqual(true);
  });

  test('adding anything other than a Todo object to the list throws a TypeError', () => {
    expect(() => list.add({})).toThrow(TypeError);
    expect(() => list.add(true)).toThrow(TypeError);
    expect(() => list.add(123)).toThrow(TypeError);
    expect(() => list.add('foobarqux')).toThrow(TypeError);
    expect(() => list.add(['a', 'b', 'c'])).toThrow(TypeError);
  });

  test('itemAt returns the item at a given index', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('markDoneAt marks todo at a given index as completed', () => {
    expect(() => list.markDoneAt(10)).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt marks todo at a given index as incomplete', () => {
    expect(() => list.markUndoneAt(10)).toThrow(ReferenceError);
    [todo1, todo2, todo3].forEach(todo => todo.markDone());
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone marks all todos as completed', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes todo at given index', () => {
    expect(() => list.removeAt(6)).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;
  
    list.markDoneAt(1);
  
    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for all done todos', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
  
    list.markAllDone();
  
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over each todo in the list', () => {
    let result = [];
    list.forEach(todo => result.push(todo));
    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

  test('getTitle returns the title of a todo item', () => {
    expect(todo1.getTitle()).toEqual(todo1.title);
  });
});