import { Asset } from "expo-asset";

const flightTicketPreview = require("../../assets/previews/flight-ticket.png");
const eVisaPreview = require("../../assets/previews/student-visa.png");
const passportPreview = require("../../assets/previews/passport.png");
const insurancePreview = require("../../assets/previews/travel-insurance.png");

function assetUri(asset: number) {
  return Asset.fromModule(asset).uri;
}

export const previewFlightTicketUri = assetUri(flightTicketPreview);
export const previewEVisaUri = assetUri(eVisaPreview);
export const previewPassportUri = assetUri(passportPreview);
export const previewInsuranceUri = assetUri(insurancePreview);
