//для тестирования компонентов
import { render, prettyDOM, screen } from "@testing-library/vue";
import BaseButton from "./BaseButton.vue";

// предосталвяется jest'ом
// в нём описывается  сам тест
test("renders base button", () => {
  //3 состовляющие теста
  // given
  const options = {
    slots: {
      default: "Test button",
    },
  };

  //when (act)

  render(BaseButton, options);

  //then(assert)

  // выводы дома в консоль
  // console.log(prettyDOM());
  // screen.debug();

  screen.getByText(/Test button/i);
});
