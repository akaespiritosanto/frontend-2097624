import { signal, computed } from "@preact/signals";

const authState = signal({
  isAuthenticated: false,
  studentNumber: "",
  password: "",
  rememberMe: false
});

const isLoginFormValid = computed(() => {
  return authState.value.studentNumber.trim() !== "" &&
         authState.value.password.trim() !== "";
});

function updateAuthState(field, value) {
  authState.value = { ...authState.value, [field]: value };
}

function login() {
  window.location.href = "/inicio";
}

function logout() {
  window.location.href = "/login";
}

function checkSavedCredentials() {
}

export {
  authState,
  isLoginFormValid,
  updateAuthState,
  login,
  logout,
  checkSavedCredentials
};
