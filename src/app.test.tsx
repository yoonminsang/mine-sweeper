import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('<App />', () => {
  it('basic test', () => {
    const { getByText } = render(<App />);
    const app = getByText('앱');
    expect(app).toBeInTheDocument();
  });
});
