const collection = JSON.parse(localStorage.getItem('taskList')) || [];
const input = document.getElementById('input');

const add = () => {
  const tasks = {
    description: input.value,
    completed: false,
    index: collection.length + 1,
  };

  if (tasks.description !== '') {
    collection.push(tasks);
  }
  localStorage.setItem('taskList', JSON.stringify(collection));
};
export default add;

const remove = (index) => {
  collection.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(collection));
};
export { remove };
