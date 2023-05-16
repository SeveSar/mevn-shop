//для тестирования компонентов
import { render, prettyDOM, screen } from "@testing-library/vue";
import BaseCheckBox from "./BaseCheckBox.vue";

// предосталвяется jest'ом
// в нём описывается  сам тест
test("renders checked base checkbox. Prop modelValue: Array", () => {
  const label = "Test checkbox";
  const options = {
    props: {
      label: label,
      value: 1,
      modelValue: [1, 2, 3],
    },
  };

  render(BaseCheckBox, options);
  const checkbox = screen.getByLabelText(label);
  expect(checkbox.checked).toBe(true);
  screen.debug();
});

test("renders checked base checkbox. Prop modelValue: boolean", () => {
  const label = "Test checkbox";
  const options = {
    props: {
      label: label,
      modelValue: true,
    },
  };

  render(BaseCheckBox, options);
  const checkbox = screen.getByLabelText(label);
  expect(checkbox.checked).toBe(true);
  screen.debug();
});

test("renders unchecked base checkbox", () => {
  render(BaseCheckBox);
  const checkbox = screen.getByRole("checkbox");

  expect(checkbox.checked).toBe(false);
  screen.debug();
});
