const useLocalStorage = () => {
  // Function to get the item from localStorage by key
  const getItem = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : initialValue;
  };

  // Function to set the item in localStorage by key
  const setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  // Function to remove the item from localStorage by key
  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;
