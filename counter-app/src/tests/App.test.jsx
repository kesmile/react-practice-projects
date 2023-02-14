import { render, screen } from '../utils/test-utils';
import App from '../App';

describe('App', () => {
  it('Check Render app', () => {
    const { getByRole, getByText } = render(<App />);
    expect( getByRole('img').getAttribute('src') ).toBe('/src/assets/react.svg');
    expect( getByText('Counter App') ).toBeTruthy();
  });
});