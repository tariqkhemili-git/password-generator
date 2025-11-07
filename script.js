// ========== CONSTANTS ==========

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "~`!@#$%^&*()_-+={[}],|:;<>.?/",
};

const SIMILAR_CHARS = "0O1lI";

const STORAGE_KEYS = {
  symbols: "includeSymbols",
  uppercase: "includeUppercase",
  lowercase: "includeLowercase",
  numbers: "includeNumbers",
  excludeSimilar: "excludeSimilar",
  memorablePassword: "memorablePassword",
  length: "passwordLength",
  theme: "theme",
};

const DEFAULT_LENGTH = 15;
const MIN_LENGTH = 12;
const MAX_LENGTH = 128;
const NOTIFICATION_DURATION = 3000;

const elements = {
  passwordFields: document.querySelectorAll(".password-field"),
  generateBtn: document.querySelector(".btn-generate"),
  copyAllBtn: document.querySelector(".btn-copy-all"),
  notification: document.querySelector(".notification-container"),
  lengthInput: document.querySelector("#passwordLength"),
  themeToggle: document.querySelector(".theme-toggle"),
  checkboxes: {
    symbols: document.querySelector("#includeSymbols"),
    uppercase: document.querySelector("#includeUppercase"),
    lowercase: document.querySelector("#includeLowercase"),
    numbers: document.querySelector("#includeNumbers"),
    excludeSimilar: document.querySelector("#excludeSimilar"),
    memorablePassword: document.querySelector("#memorablePassword"),
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

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
    document.body.setAttribute("data-theme", savedTheme);
  },

  save: () => {
    Object.entries(elements.checkboxes).forEach(([key, checkbox]) => {
      localStorage.setItem(STORAGE_KEYS[key], checkbox.checked);
    });
    localStorage.setItem(STORAGE_KEYS.length, elements.lengthInput.value);
  },
};

const getRandomInt = (max) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateMemorablePassword = () => {
  const wordCount = 4;
  const words = [];

  for (let i = 0; i < wordCount; i++) {
    const word = MEMORABLE_WORDS[getRandomInt(MEMORABLE_WORDS.length)];
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    words.push(capitalized);
  }

  const number = getRandomInt(100);
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
  const symbol = symbols[getRandomInt(symbols.length)];

  return words.join("-") + number + symbol;
};

const ensurePatternRequirements = (password, characters) => {
  const types = [];
  const charArrays = {};

  if (elements.checkboxes.uppercase.checked) {
    types.push("uppercase");
    charArrays.uppercase = CHAR_SETS.uppercase.split("");
  }
  if (elements.checkboxes.lowercase.checked) {
    types.push("lowercase");
    charArrays.lowercase = CHAR_SETS.lowercase.split("");
  }
  if (elements.checkboxes.numbers.checked) {
    types.push("numbers");
    charArrays.numbers = CHAR_SETS.numbers.split("");
  }
  if (elements.checkboxes.symbols.checked) {
    types.push("symbols");
    charArrays.symbols = CHAR_SETS.symbols.split("");
  }

  if (types.length === 0) return password;

  const passwordArray = password.split("");
  types.forEach((type, index) => {
    const hasType = passwordArray.some((char) =>
      charArrays[type].includes(char)
    );
    if (!hasType && passwordArray.length > index) {
      const randomChar =
        charArrays[type][getRandomInt(charArrays[type].length)];
      passwordArray[index] = randomChar;
    }
  });

  return shuffleArray(passwordArray).join("");
};

const generatePassword = () => {
  if (elements.checkboxes.memorablePassword.checked) {
    return generateMemorablePassword();
  }

  const length = parseInt(elements.lengthInput.value) || DEFAULT_LENGTH;

  let characters = Object.entries(elements.checkboxes)
    .filter(([key]) => key !== "excludeSimilar" && key !== "memorablePassword")
    .filter(([_, checkbox]) => checkbox.checked)
    .map(([key]) => CHAR_SETS[key])
    .join("");

  if (elements.checkboxes.excludeSimilar.checked) {
    characters = characters
      .split("")
      .filter((char) => !SIMILAR_CHARS.includes(char))
      .join("");
  }

  if (!characters) return "";

  let password = Array.from(
    { length },
    () => characters[getRandomInt(characters.length)]
  ).join("");

  password = ensurePatternRequirements(password, characters);

  return password;
};

const showNotification = (
  message = "Password copied to clipboard!",
  type = "success"
) => {
  const container = elements.notification;
  const notification = container.querySelector(".notification");
  const textElement = notification.querySelector(".notification-text");
  const iconElement = notification.querySelector(".notification-icon");
  const closeBtn = notification.querySelector(".notification-close");

  // Update message
  textElement.textContent = message;

  // Update icon based on type
  if (type === "error") {
    iconElement.innerHTML =
      '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';
  } else if (type === "info") {
    iconElement.innerHTML =
      '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
  } else {
    iconElement.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
  }

  // Remove previous type classes and add new one
  notification.className = `notification ${type}`;

  // Show notification with entrance animation
  container.classList.add("show");

  // Auto-hide after 3 seconds
  const hideTimeout = setTimeout(() => {
    container.classList.remove("show");
  }, 3000);

  // Close button handler
  const closeHandler = () => {
    clearTimeout(hideTimeout);
    container.classList.remove("show");
    closeBtn.removeEventListener("click", closeHandler);
  };

  // Remove old event listeners and add new one
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  newCloseBtn.addEventListener("click", closeHandler);

  // Keyboard support for close button
  newCloseBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeHandler();
    }
  });
};

const copyToClipboard = (text) => {
  // Check if text exists and is not empty/whitespace only
  if (!text || text.trim() === "") return;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Password copied to clipboard!", "success");
    })
    .catch(() => {
      showNotification("Failed to copy password", "error");
    });
};

const copyAllPasswords = () => {
  const passwords = Array.from(elements.passwordFields)
    .map((field) => field.textContent)
    .filter((text) => text && text.trim() !== "" && !text.includes("loading"));

  if (passwords.length === 0) {
    showNotification("No passwords to copy", "info");
    return;
  }

  const allPasswords = passwords.join("\n");
  navigator.clipboard
    .writeText(allPasswords)
    .then(() => {
      showNotification(
        `${passwords.length} password${
          passwords.length > 1 ? "s" : ""
        } copied!`,
        "success"
      );
    })
    .catch(() => {
      showNotification("Failed to copy passwords", "error");
    });
};

const generateAllPasswords = () => {
  elements.passwordFields.forEach((field) => {
    field.classList.add("generating");

    setTimeout(() => {
      const password = generatePassword();
      field.textContent = password;
      field.style.cursor = password ? "pointer" : "default";
      field.classList.remove("generating");
      field.classList.add("fade-in");

      setTimeout(() => field.classList.remove("fade-in"), 300);
    }, 100);
  });
};

const toggleTheme = () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem(STORAGE_KEYS.theme, newTheme);

  // Add pulse and rotation animations
  elements.themeToggle.classList.add("clicked", "animating");
  setTimeout(() => {
    elements.themeToggle.classList.remove("clicked", "animating");
  }, 600);
};

const handleMemorablePasswordToggle = () => {
  const isMemorableChecked = elements.checkboxes.memorablePassword.checked;
  const otherCheckboxes = Object.entries(elements.checkboxes).filter(
    ([key]) => key !== "memorablePassword"
  );

  otherCheckboxes.forEach(([_, checkbox]) => {
    checkbox.disabled = isMemorableChecked;
    checkbox.parentElement.style.opacity = isMemorableChecked ? "0.5" : "1";
    checkbox.parentElement.style.cursor = isMemorableChecked
      ? "not-allowed"
      : "pointer";
  });

  elements.lengthInput.disabled = isMemorableChecked;
  elements.lengthInput.style.opacity = isMemorableChecked ? "0.5" : "1";
  elements.lengthInput.style.cursor = isMemorableChecked
    ? "not-allowed"
    : "text";

  updateGenerateButtonState();
};

const updateGenerateButtonState = () => {
  // Check if memorable password is enabled
  if (elements.checkboxes.memorablePassword.checked) {
    elements.generateBtn.disabled = false;
    elements.generateBtn.style.opacity = "1";
    elements.generateBtn.style.cursor = "pointer";
    return;
  }

  // Check password length is within valid range
  const length = parseInt(elements.lengthInput.value);
  if (!length || length < MIN_LENGTH || length > MAX_LENGTH) {
    elements.generateBtn.disabled = true;
    elements.generateBtn.style.opacity = "0.5";
    elements.generateBtn.style.cursor = "not-allowed";
    return;
  }

  // Check if at least one character type is selected
  const characterTypesSelected = [
    elements.checkboxes.symbols,
    elements.checkboxes.uppercase,
    elements.checkboxes.lowercase,
    elements.checkboxes.numbers,
  ].some((checkbox) => checkbox.checked);

  // Disable if no character types are selected
  if (!characterTypesSelected) {
    elements.generateBtn.disabled = true;
    elements.generateBtn.style.opacity = "0.5";
    elements.generateBtn.style.cursor = "not-allowed";
  } else {
    elements.generateBtn.disabled = false;
    elements.generateBtn.style.opacity = "1";
    elements.generateBtn.style.cursor = "pointer";
  }
};

const handleKeyboardShortcuts = (e) => {
  if (e.key === "Enter" && e.target === elements.lengthInput) {
    e.preventDefault();
    generateAllPasswords();
  }

  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    generateAllPasswords();
  }

  if ((e.ctrlKey || e.metaKey) && e.key === " ") {
    e.preventDefault();
    generateAllPasswords();
  }

  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "c") {
    e.preventDefault();
    copyAllPasswords();
  }
};

const init = () => {
  storage.load();
  handleMemorablePasswordToggle();
  updateGenerateButtonState();

  elements.generateBtn.addEventListener("click", generateAllPasswords);
  elements.copyAllBtn.addEventListener("click", copyAllPasswords);
  elements.themeToggle.addEventListener("click", toggleTheme);

  elements.passwordFields.forEach((field) => {
    field.addEventListener("click", () => {
      const text = field.textContent;
      // Only copy if field has valid content
      if (text && text.trim() !== "") {
        copyToClipboard(text);
      }
    });
    field.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const text = field.textContent;
        // Only copy if field has valid content
        if (text && text.trim() !== "") {
          copyToClipboard(text);
        }
      }
    });
  });

  Object.values(elements.checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      storage.save();
      updateGenerateButtonState();
    });
  });

  elements.checkboxes.memorablePassword.addEventListener(
    "change",
    handleMemorablePasswordToggle
  );

  elements.lengthInput.addEventListener("input", storage.save);

  // Validate password length input and update button state
  elements.lengthInput.addEventListener("input", () => {
    updateGenerateButtonState();
  });

  document.addEventListener("keydown", handleKeyboardShortcuts);
};

init();
