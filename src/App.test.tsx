import { fireEvent, render, screen, within, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
vi.mock('./components/PriceChart', () => ({ PriceChart: () => <div>Demo chart</div> }));
beforeEach(() => { window.location.hash = '/'; window.scrollTo = vi.fn(); });
async function navigate(path: string) { await act(async () => { window.location.hash = path; window.dispatchEvent(new HashChangeEvent('hashchange')); }); }
describe('Fillsight demo', () => {
  it('shows demo disclosure and links featured stations to full profiles', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Good fuel.');
    expect(screen.getByText(/All stations, prices, distances, and trends are fictional/)).toBeVisible();
    expect(screen.getByRole('link', { name: /Northline Fuel/ })).toHaveAttribute('href', '#/stations/northline');
    fireEvent.click(screen.getByRole('button', { name: 'Premium' }));
    expect(screen.getByRole('link', { name: /Northline Fuel/ })).toHaveTextContent('171.9');
  });
  it('filters stations, handles empty results, and synchronizes map selection', async () => {
    render(<App />); await navigate('/explore');
    const search = screen.getByRole('textbox', { name: 'Search stations or areas' });
    fireEvent.change(search, { target: { value: 'Scarborough' } });
    expect(screen.getByText('1 results')).toBeVisible();
    expect(screen.getByRole('link', { name: 'View station details' })).toHaveAttribute('href', '#/stations/eastway');
    fireEvent.change(search, { target: { value: 'missing station' } });
    expect(screen.getByRole('heading', { name: 'No stations found' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    fireEvent.click(screen.getByRole('button', { name: /Select Maple Service Station/ }));
    expect(screen.getByRole('link', { name: 'View station details' })).toHaveAttribute('href', '#/stations/maple');
  });
  it('opens station details with fuel prices, history and amenities', async () => {
    render(<App />); await navigate('/stations/northline');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Northline Fuel');
    expect(screen.getByText(/Prices, history, address, hours, and amenities are placeholders/)).toBeVisible();
    expect(screen.getByText('Convenience store')).toBeInTheDocument();
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(15);
    fireEvent.click(screen.getByRole('button', { name: '7 days' }));
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(8);
  });
  it('provides navigation and a useful unknown-route state', async () => {
    render(<App />); await navigate('/missing');
    expect(screen.getByRole('heading', { name: 'That stop isn’t here.' })).toBeVisible();
    expect(within(screen.getByRole('navigation')).getAllByRole('link')).toHaveLength(4);
  });
});
