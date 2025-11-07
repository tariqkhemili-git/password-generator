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

// ========== DOM ELEMENTS ==========

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

// ========== UTILITY FUNCTIONS ==========

/**
 * Generates a cryptographically secure random integer
 * Falls back to Math.random if crypto API is unavailable
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random integer between 0 and max
 */
const getRandomInt = (max) => {
  try {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  } catch (error) {
    console.warn("Crypto API unavailable, using Math.random fallback");
    return Math.floor(Math.random() * max);
  }
};

/**
 * Shuffles array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// ========== STORAGE MANAGEMENT ==========

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

// ========== PASSWORD GENERATION ==========

/**
 * Generates a memorable password using random words
 * Format: Word-Word-Word-Word##!
 * @returns {string} Memorable password
 */
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

/**
 * Ensures generated password contains at least one character from each selected type
 * @param {string} password - Generated password to validate
 * @returns {string} Password with guaranteed character type coverage
 */
const ensurePatternRequirements = (password) => {
  const types = [];
  const charArrays = {};

  // Build arrays for checked character types
  Object.entries(elements.checkboxes).forEach(([key, checkbox]) => {
    if (CHAR_SETS[key] && checkbox.checked) {
      types.push(key);
      charArrays[key] = CHAR_SETS[key].split("");
    }
  });

  if (types.length === 0) return password;

  const passwordArray = password.split("");

  // Ensure at least one character from each type exists
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

/**
 * Generates a secure password based on user preferences
 * @returns {string} Generated password
 */
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

  return ensurePatternRequirements(password);
};

// ========== UI FUNCTIONS ==========

/**
 * Displays a notification message to the user
 * @param {string} message - Message to display
 * @param {string} type - Notification type: 'success', 'error', or 'info'
 */
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

/**
 * Copies text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy
 */
const copyToClipboard = async (text) => {
  // Check if text exists and is not empty/whitespace only
  if (!text || text.trim() === "") return;

  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showNotification("Password copied to clipboard!", "success");
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        showNotification("Password copied to clipboard!", "success");
      } catch (err) {
        showNotification("Failed to copy password", "error");
      }

      document.body.removeChild(textArea);
    }
  } catch (error) {
    showNotification("Failed to copy password", "error");
  }
};

/**
 * Copies all generated passwords to clipboard
 */
const copyAllPasswords = async () => {
  const passwords = Array.from(elements.passwordFields)
    .map((field) => field.textContent)
    .filter((text) => text && text.trim() !== "" && !text.includes("loading"));

  if (passwords.length === 0) {
    showNotification("No passwords to copy", "info");
    return;
  }

  const allPasswords = passwords.join("\n");

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(allPasswords);
      showNotification(
        `${passwords.length} password${
          passwords.length > 1 ? "s" : ""
        } copied!`,
        "success"
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = allPasswords;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showNotification(
        `${passwords.length} password${
          passwords.length > 1 ? "s" : ""
        } copied!`,
        "success"
      );
    }
  } catch (error) {
    showNotification("Failed to copy passwords", "error");
  }
};

/**
 * Generates passwords for all password fields
 */
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

/**
 * Toggles between dark and light theme
 */
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

/**
 * Handles memorable password toggle and disables/enables other options
 */
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

/**
 * Updates generate button enabled/disabled state based on validation rules
 */
const updateGenerateButtonState = () => {
  // Check if memorable password is enabled
  if (elements.checkboxes.memorablePassword.checked) {
    setButtonState(false);
    return;
  }

  // Check password length is within valid range
  const length = parseInt(elements.lengthInput.value);
  if (!length || length < MIN_LENGTH || length > MAX_LENGTH) {
    setButtonState(true);
    return;
  }

  // Check if at least one character type is selected
  const characterTypesSelected = [
    elements.checkboxes.symbols,
    elements.checkboxes.uppercase,
    elements.checkboxes.lowercase,
    elements.checkboxes.numbers,
  ].some((checkbox) => checkbox.checked);

  setButtonState(!characterTypesSelected);
};

/**
 * Sets the generate button state
 * @param {boolean} disabled - Whether to disable the button
 */
const setButtonState = (disabled) => {
  elements.generateBtn.disabled = disabled;
  elements.generateBtn.style.opacity = disabled ? "0.5" : "1";
  elements.generateBtn.style.cursor = disabled ? "not-allowed" : "pointer";
};

/**
 * Handles keyboard shortcuts for the application
 * @param {KeyboardEvent} e - Keyboard event
 */
const handleKeyboardShortcuts = (e) => {
  // Enter key on length input or Ctrl/Cmd+Enter or Ctrl/Cmd+Space - Generate passwords
  if (
    (e.key === "Enter" && e.target === elements.lengthInput) ||
    ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === " "))
  ) {
    e.preventDefault();
    generateAllPasswords();
  }

  // Ctrl/Cmd+Shift+C - Copy all passwords
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "c") {
    e.preventDefault();
    copyAllPasswords();
  }
};

// ========== INITIALIZATION ==========

/**
 * Initializes the application
 * Sets up event listeners and loads saved preferences
 */
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

  elements.lengthInput.addEventListener("input", () => {
    storage.save();
    updateGenerateButtonState();
  });

  document.addEventListener("keydown", handleKeyboardShortcuts);
};

init();
