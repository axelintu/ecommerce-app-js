import shippingAddresses from "../data/shippingAddress.json";

export function getShippingAddresses() {
  return new Promise((resolve)=> {
    setTimeout(() => {
      resolve(shippingAddresses || []);
    }, 600);
  })
}

export async function getDefaultshippingAddress() {
  const addresses = await getShippingAddresses();
  return addresses.find((a)=> a.isDefault === true || a.default === true || addresses[0] || null);
}