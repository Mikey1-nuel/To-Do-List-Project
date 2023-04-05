let collection = JSON.parse(localStorage.getItem('taskList')) || [];

const deleteItems = () => {
  const deleteAll = collection.filter((item) => item.completed === false);
  collection = deleteAll;
  localStorage.setItem('taskList', JSON.stringify(collection));
  window.location.reload();
};
export default deleteItems;