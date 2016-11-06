const STORAGE_KEY = 'storage-prefix';
const storage = window.localStorage;

function toast(string) {
  const toastElement = document.getElementById('toast');
  toastElement.innerHTML = string;
  toastElement.className = "toast toast-show";
  window.setTimeout(() => {
    toastElement.className = "toast toast-hidden";
  }, 2000);
}

function set(inputValues) {
  inputValues.shift();
  const prefix = inputValues.join(' ');
  storage.setItem(STORAGE_KEY, prefix);
  toast(`prefix set to ${prefix}`);
}

function clear() {
  storage.setItem(STORAGE_KEY, '');
  toast('prefix cleared');
}

function show() {
  const prefix = storage.getItem(STORAGE_KEY);
  if (prefix) toast(`prefix set to ${prefix}`);
  else toast('prefix is not set');
}

function search(inputValues) {
  const prefix = storage.getItem(STORAGE_KEY) || '';
  const queryString = [...prefix.split(' '), ...inputValues].join('+');
  window.location.href = `https://www.google.ca/search?q=${queryString}`;
}

function go() {
  const inputElement = document.getElementById('search-input');
  const inputValues = inputElement.value.split(' ');
  switch (inputValues[0]) {
    case '/set':
      set(inputValues);
      break;
    case '/clear':
      clear();
      break;
    case '/show':
      show();
      break;
    default:
      search(inputValues);
  }

  inputElement.value = '';
  return false;
}
