import { render, screen, expect } from '@testing-library/react';
import Greetings from './Greetings';

test('hello', () => {
  // arrange
  render(<Greetings />);

  //act
  //   nothing...

  // assert
  const hello = screen.getByText('hello', { exact: false });
  expect(hello).toBeInTheDocument();
});
