export const BOOKINGS_KEY = 'bookings';

export function getLocalBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveLocalBookings(bookings: any[]) {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    // ignore storage errors for now
  }
}

export function addLocalBooking(booking: any) {
  const list = getLocalBookings();
  list.push(booking);
  saveLocalBookings(list);
}
