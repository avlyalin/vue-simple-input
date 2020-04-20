import { toBeVisible } from '@testing-library/jest-dom/matchers';
import { fireEvent, render } from '@testing-library/vue';
import VInput from './VInput';

expect.extend({ toBeVisible });

test('input is compatible with v-model', async () => {
  const { getByTestId, getByDisplayValue, emitted } = render(VInput, {
    props: {
      value: '',
    },
  });
  const input = getByTestId('input-element');
  const testValue = 'some text';
  await fireEvent.update(input, testValue);
  expect(getByDisplayValue(testValue)).toBeTruthy();
  expect(emitted().input[0]).toEqual(['some text']);
});

test('input can have label', async () => {
  const { getByTestId, getByLabelText } = render(VInput, {
    props: {
      value: '',
      label: 'Field description',
    },
  });
  const input = getByTestId('input-element');
  const label = getByLabelText('field description', {
    exact: false,
  });
  expect(input).toBeTruthy();
  expect(label).toBeTruthy();
});

test('input can be cleared', async () => {
  const { getByTestId, emitted } = render(VInput, {
    props: {
      value: 'some text',
    },
  });
  const input = getByTestId('input-element');
  await input.focus();
  const clearButton = getByTestId('clear-button');
  await fireEvent.click(clearButton);
  expect(emitted().input[0]).toEqual(['']);
});

test('clear button is visible when input is not empty and in focus', async () => {
  const { getByTestId, queryByTestId, updateProps } = render(VInput, {
    props: {
      value: '',
    },
  });
  expect(queryByTestId('clear-button')).toBeNull();

  const input = getByTestId('input-element');
  await input.focus();
  await updateProps({ value: 'some-text' });
  expect(getByTestId('clear-button')).toBeVisible();
});

test('clear button is visible when input is not empty and container has "mouseenter"', async () => {
  const { getByTestId, queryByTestId, container } = render(VInput, {
    props: {
      value: 'some text',
    },
  });
  expect(queryByTestId('clear-button')).toBeNull();

  await fireEvent.mouseEnter(container.firstChild);
  expect(getByTestId('clear-button')).toBeVisible();
});

test('clear button is visible when input is in focus and not disabled', async () => {
  const { getByTestId, queryByTestId, updateProps } = render(VInput, {
    props: {
      value: 'input text',
      disabled: true,
    },
  });
  expect(queryByTestId('clear-button')).toBeNull();

  await updateProps({ disabled: false });
  const input = getByTestId('input-element');
  await input.focus();
  expect(getByTestId('clear-button')).toBeVisible();
});

test('clear button is visible when input is in focus and not read only', async () => {
  const { getByTestId, queryByTestId, updateProps } = render(VInput, {
    props: {
      value: 'input text',
      readonly: true,
    },
  });
  expect(queryByTestId('clear-button')).toBeNull();

  await updateProps({ readonly: false });
  const input = getByTestId('input-element');
  await input.focus();
  expect(getByTestId('clear-button')).toBeVisible();
});

test('event listeners are passed to input element', async () => {
  const eventCallback = jest.fn();
  const { getByTestId } = render(VInput, {
    props: {
      value: '',
    },
    listeners: {
      mouseover: eventCallback,
    },
  });
  const input = getByTestId('input-element');
  await fireEvent.mouseOver(input);
  await fireEvent.mouseOver(input);
  expect(eventCallback).toHaveBeenCalledTimes(2);
});
