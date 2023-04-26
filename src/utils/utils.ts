import mongoose from "mongoose";

export const generateTimeStamp = () => {
  return Date.now().toString();
};

export const generateNumberTimeStamp = () => {
  return Date.now();
};

export const ObjectId = (item: string) => {
  return new mongoose.Types.ObjectId(item);
};

export function isObjectId(id: string) {
  return mongoose.isValidObjectId(id);
}

// Checks if number
export function isNumeric(num: string | number) {
  return /^-?\d+$/.test(num.toString());
}

export function isValidLat(lat: number) {
  // The latitude must be a number between -90 and 90
  return lat && isFinite(lat) && Math.abs(lat) <= 90;
}
export function isValidLng(lng: number) {
  // The longitude must be a number between -180 and 180.
  return lng && isFinite(lng) && Math.abs(lng) <= 180;
}

export function isValidLatAndLng(obj: { lat: number; lng: number }) {
  if (!isValidLat(obj.lat)) return false;
  if (!isValidLng(obj.lng)) return false;
  return true;
}

export function isCode(num: string | number) {
  return num.toString().length === 10;
}

export const getLngAndLat = (url: string) => {
  const cords = url.split("?q=")[1].split(",");
  return {
    lat: cords[0],
    lng: cords[1]
  };
};

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const getDistanceLngAndLat = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in KM
};

// Returns date in format DD/MM/YYYY
export function getFormattedDate(d = new Date()) {
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(n => (n < 10 ? `0${n}` : `${n}`))
    .join("/");
}
