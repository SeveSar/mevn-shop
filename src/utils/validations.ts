import { required, email, minLength, helpers } from "@vuelidate/validators";

const validations = {
  email: {
    required: helpers.withMessage("Поле не должно быть пустым", required),
    email: helpers.withMessage("Введите корректный email", email),
  },
  password: {
    required: helpers.withMessage("Поле не должно быть пустым", required),
    minLength: helpers.withMessage("Не менее 6 символов", minLength(6)),
  },
  name: {
    required: helpers.withMessage("Поле не должно быть пустым", required),
    minLength: helpers.withMessage("Не менее 2 символов", minLength(2)),
  },
} as const;

const getValidationRule = (key: keyof typeof validations) => {
  return validations[key];
};
export { getValidationRule };
