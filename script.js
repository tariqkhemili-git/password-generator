const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "~`!@#$%^&*()_-+={[}],|:;<>.?/",
};

const STORAGE_KEYS = {
  symbols: "includeSymbols",
  uppercase: "includeUppercase",
  lowercase: "includeLowercase",
  numbers: "includeNumbers",
  length: "passwordLength",
};

const DEFAULT_LENGTH = 15;
const NOTIFICATION_DURATION = 3000;

const elements = {
  passwordFields: document.querySelectorAll(".password-field"),
  generateBtn: document.querySelector(".btn-generate"),
  notification: document.querySelector(".notification-container"),
  lengthInput: document.querySelector("#passwordLength"),
  checkboxes: {
    symbols: document.querySelector("#includeSymbols"),
    uppercase: document.querySelector("#includeUppercase"),
    lowercase: document.querySelector("#includeLowercase"),
    numbers: document.querySelector("#includeNumbers"),
  },
};

const storage = {
  load: () => {
    Object.entries(elements.checkboxes).forEach(([key, checkbox]) => {
      const saved = localStorage.getItem(STORAGE_KEYS[key]);
      if (saved !== null) checkbox.checked = saved === "true";
    });

    const savedLength = localStorage.getItem(STORAGE_KEYS.length);
    if (savedLength) elements.lengthInput.value = savedLength;
  },

  save: () => {
    Object.entries(elements.checkboxes).forEach(([key, checkbox]) => {
      localStorage.setItem(STORAGE_KEYS[key], checkbox.checked);
    });
    localStorage.setItem(STORAGE_KEYS.length, elements.lengthInput.value);
  },
};

const generatePassword = () => {
  const length = parseInt(elements.lengthInput.value) || DEFAULT_LENGTH;

  const characters = Object.entries(elements.checkboxes)
    .filter(([_, checkbox]) => checkbox.checked)
    .map(([key]) => CHAR_SETS[key])
    .join("");

  if (!characters) return "";

  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const showNotification = () => {
  elements.notification.classList.add("show");
  setTimeout(
    () => elements.notification.classList.remove("show"),
    NOTIFICATION_DURATION
  );
};

const copyToClipboard = (text) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  showNotification();
};

const generateAllPasswords = () => {
  elements.passwordFields.forEach((field) => {
    const password = generatePassword();
    field.textContent = password;
    field.style.cursor = password ? "pointer" : "default";
  });
};

const init = () => {
  storage.load();

  elements.generateBtn.addEventListener("click", generateAllPasswords);

  elements.passwordFields.forEach((field) => {
    field.addEventListener("click", () => copyToClipboard(field.textContent));
  });

  Object.values(elements.checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", storage.save);
  });

  elements.lengthInput.addEventListener("input", storage.save);
};

init();
