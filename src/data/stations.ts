export type Fuel = 'Regular' | 'Premium' | 'Diesel';
export interface Station {
  id: string;
  name: string;
  brand: string;
  area: string;
  address: string;
  prices: Record<Fuel, number>;
  distance: number;
  amenities: string[];
  position: { lat: number; lng: number; x: number; y: number };
  history: { day: string; price: number }[];
}
// Synthetic fixtures only. These names, addresses, coordinates and prices are not verified station records.
export const stations: Station[] = [
  { id: 'northline', name: 'Northline Fuel', brand: 'NF', area: 'Markham', address: '100 Example Avenue, Markham, ON', prices: { Regular: 149.9, Premium: 171.9, Diesel: 157.9 }, distance: 1.2, amenities: ['Open 24 hours', 'Convenience store', 'Air pump'], position: { lat: 43.86, lng: -79.32, x: 64, y: 32 }, history: [] },
  { id: 'maple', name: 'Maple Service Station', brand: 'MS', area: 'Richmond Hill', address: '200 Demo Road, Richmond Hill, ON', prices: { Regular: 151.4, Premium: 173.4, Diesel: 159.4 }, distance: 3.4, amenities: ['Open 24 hours', 'Car wash', 'Convenience store'], position: { lat: 43.87, lng: -79.43, x: 35, y: 24 }, history: [] },
  { id: 'eastway', name: 'Eastway Gas', brand: 'EG', area: 'Scarborough', address: '300 Sample Street, Scarborough, ON', prices: { Regular: 152.6, Premium: 174.6, Diesel: 160.6 }, distance: 4.8, amenities: ['Convenience store', 'Air pump', 'Accessible entrance'], position: { lat: 43.77, lng: -79.25, x: 74, y: 66 }, history: [] },
  { id: 'cedar', name: 'Cedar Point Fuel', brand: 'CP', area: 'Markham', address: '400 Placeholder Lane, Markham, ON', prices: { Regular: 153.2, Premium: 175.2, Diesel: 161.2 }, distance: 5.1, amenities: ['Car wash', 'Air pump'], position: { lat: 43.84, lng: -79.29, x: 77, y: 43 }, history: [] },
  { id: 'park', name: 'Parkside Energy', brand: 'PE', area: 'Richmond Hill', address: '500 Example Drive, Richmond Hill, ON', prices: { Regular: 154.9, Premium: 176.9, Diesel: 162.9 }, distance: 6.3, amenities: ['Open 24 hours', 'Convenience store'], position: { lat: 43.83, lng: -79.44, x: 30, y: 46 }, history: [] },
].map((station) => ({ ...station, history: [155.4, 156.2, 154.8, 155.1, 152.9, 153.7, 151.8, 152.2, 150.6, 151.4, 149.8, 150.7, 150.2, station.prices.Regular].map((price, i) => ({ day: `Oct ${i + 7}`, price: i === 13 ? station.prices.Regular : Number((price + (station.prices.Regular - 149.9) * .35).toFixed(1)) })) }));
export const fuels: Fuel[] = ['Regular', 'Premium', 'Diesel'];
export const money = (price: number) => price.toFixed(1);
