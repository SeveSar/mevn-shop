import { render, fireEvent, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import BaseModal from './BaseModal.vue';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(() => ({ name: 'Home' })),
}));

it('renders with header and body', () => {
  const header = 'Header';
  const body = 'Body';
  const { debug, getByText } = render(BaseModal, {
    slots: {
      header,
      default: body,
    },
    props: {
      isOpen: true,
    },
  });
  getByText(header);
  getByText(body);
  debug();
});
