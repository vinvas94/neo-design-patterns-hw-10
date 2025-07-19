import * as fs from 'fs'
import { TaskManager } from './services/TaskManager';
import { log } from 'console';

function logToFile(content: string) {
  fs.appendFileSync('task-log.txt', content + '\n', 'utf8');
}

function logStep(title: string, data: any) {
  const text = `${title}\n${JSON.stringify(data, null, 2)}\n`;
  console.log(title);
  console.log(data);
  logToFile(text);
}

// Очистити лог перед початком
fs.writeFileSync('task-log.txt', '', 'utf8');

const manager = new TaskManager();

// Додаємо нову задачу
const taskId = manager.addTask({
    title: 'Завершити домашнє завдання',
    priority: 'high'
});

console.log('--- Після додавання задачі ---');
console.log(manager.getTasks());
logStep('Після додавання задачі', manager.getTasks());


// Оновлюємо задачу
manager.updateTask(taskId, {
    title: 'Завершити складне домашнє завдання',
    priority: 'medium'
});

console.log('--- Після оновлення задачі ---');
console.log(manager.getTasks());
logStep('Після оновлення задачі', manager.getTasks());

// Позначаємо задачу як виконану
manager.completeTask(taskId, true);

console.log('--- Після позначення як виконаної ---');
console.log(manager.getTasks());
logStep ('Після позначення як виконаної', manager.getTasks());

// Видаляємо задачу
manager.removeTask(taskId);

console.log('--- Після видалення задачі ---');
console.log(manager.getTasks());
logStep ('Після видалення задачі', manager.getTasks());

// Скасовуємо видалення
manager.undo();

console.log('--- Після undo видалення ---');
console.log(manager.getTasks());
logStep ('Після undo видалення', manager.getTasks());

// Скасовуємо зміну статусу (completed)
manager.undo();

console.log('--- Після undo виконання задачі ---');
console.log(manager.getTasks());
logStep ('Після undo виконання задачі', manager.getTasks());

// Скасовуємо оновлення задачі
manager.undo();

console.log('--- Після undo оновлення задачі ---');
console.log(manager.getTasks());
logStep ('Після undo оновлення задачі', manager.getTasks());

// Скасовуємо додавання задачі
manager.undo();

console.log('--- Після undo додавання задачі ---');
console.log(manager.getTasks());
logStep ('Після undo додавання задачі', manager.getTasks());

// Відновлюємо додавання задачі
manager.redo();

console.log('--- Після redo додавання задачі ---');
console.log(manager.getTasks());
logStep ('Після redo додавання задачі', manager.getTasks());

// Відновлюємо оновлення задачі
manager.redo();

console.log('--- Після redo оновлення задачі ---');
console.log(manager.getTasks());
logStep ('Після redo оновлення задачі', manager.getTasks());

// Відновлюємо зміну статусу
manager.redo();

console.log('--- Після redo виконання задачі ---');
console.log(manager.getTasks());
logStep ('Після redo виконання задачі', manager.getTasks());

// Відновлюємо видалення задачі
manager.redo();

console.log('--- Після redo видалення задачі ---');
console.log(manager.getTasks()); 
logStep ('Після redo видалення задачі', manager.getTasks());