import { signal, computed } from "@preact/signals";

const userData = signal({
  fullName: "",
  password: "",
  confirmPassword: "",
  email: ""
});

const validationErrors = signal({
  fullName: "",
  password: "",
  confirmPassword: "",
  email: ""
});

const isFormValid = computed(() => {
  const errors = validationErrors.value;
  return !errors.fullName &&
         !errors.password &&
         !errors.confirmPassword &&
         !errors.email;
});

function updateUserData(field, value) {
  userData.value = { ...userData.value, [field]: value };
  validateField(field, value);
}

function validateField(field, value) {
  let error = "";

  switch (field) {
    case "fullName":
      if (!value.trim()) {
        error = "Nome completo é obrigatório";
      } else if (value.trim().length < 3) {
        error = "Nome deve ter pelo menos 3 caracteres";
      }
      break;

    case "password":
      if (!value) {
        error = "Password é obrigatória";
      } else if (value.length < 6) {
        error = "Password deve ter pelo menos 6 caracteres";
      }

      if (userData.value.confirmPassword &&
          value !== userData.value.confirmPassword) {
        validationErrors.value = {
          ...validationErrors.value,
          confirmPassword: "As passwords não coincidem"
        };
      } else if (userData.value.confirmPassword) {
        validationErrors.value = {
          ...validationErrors.value,
          confirmPassword: ""
        };
      }
      break;

    case "confirmPassword":
      if (!value) {
        error = "Confirmação de password é obrigatória";
      } else if (value !== userData.value.password) {
        error = "As passwords não coincidem";
      }
      break;

    case "email":
      if (!value) {
        error = "Email é obrigatório";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email inválido";
      }
      break;

    default:
      break;
  }

  validationErrors.value = { ...validationErrors.value, [field]: error };
}

function resetForm() {
  userData.value = {
    fullName: "",
    password: "",
    confirmPassword: "",
    email: ""
  };

  validationErrors.value = {
    fullName: "",
    password: "",
    confirmPassword: "",
    email: ""
  };
}

function submitRegistration() {
  console.log("Submitting registration:", userData.value);
  setTimeout(() => {
    resetForm();
    alert("Registro concluído com sucesso!");
    window.location.assign("/inicio");
    setTimeout(() => {
      window.location.href = "/inicio";
      if (window.location.pathname !== "/inicio") {
        window.location.replace("/inicio");
      }
    }, 100);
  }, 1000);
}

export {
  userData,
  validationErrors,
  isFormValid,
  updateUserData,
  validateField,
  resetForm,
  submitRegistration
};
