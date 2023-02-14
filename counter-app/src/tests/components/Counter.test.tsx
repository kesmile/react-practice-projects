import Counter from '../../components/Counter';
import { render, fireEvent } from '../../utils/test-utils';

describe('Test <Counter />', () => {
    it('Render component default parameters', () => {
        const { getByTestId, getAllByRole } = render(<Counter />);
        expect(getByTestId('counter-value').textContent).toBe('0');
        expect(getAllByRole('button').length).toBe(3)
    });

    it('Increment the component', () => {
        const { getByText, getByTestId } = render(<Counter />);
        const button = getByText('+');
        fireEvent.click(button);
        expect(getByTestId('counter-value').textContent).toBe('1');
    });

    it('Decrement the component', () => {
        const initValue = 10;
        const { getByText, getByTestId } = render(<Counter value={initValue} />);
        const button = getByText('-');
        fireEvent.click(button);
        expect(getByTestId('counter-value').textContent).toBe('9');
    });

    it('Reset the component', () => {
        const initValue = 10;
        const { getByText, getByTestId } = render(<Counter value={initValue} />);

        const incrementButton = getByText('+');
        fireEvent.click(incrementButton);

        const restButton = getByText('Reset');
        fireEvent.click(restButton);

        expect(getByTestId('counter-value').textContent).toBe(`${initValue}`);
    });
});