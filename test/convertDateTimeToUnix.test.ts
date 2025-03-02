import { describe, it, expect } from "vitest";
import { convertDateTimeToUnix } from "../utils";

describe("convertDateTimeToUnix", () => {
    // Known timestamp: March 14, 2024 12:00:00 UTC = 1710417600
    const KNOWN_TIMESTAMP = 1710417600;

    // Valid formats
    it("converts ISO format correctly", () => {
        const input = "2024-03-14T12:00:00Z";
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    it("converts ISO format with timezone offset", () => {
        const input = "2024-03-14T22:00:00+10:00"; // Same time as above
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    it("converts date-only format correctly", () => {
        const input = "2024-03-14";
        expect(convertDateTimeToUnix(input)).toBe(1710374400); // Start of day UTC
    });

    it("converts US format correctly", () => {
        const input = "03/14/2024";
        expect(convertDateTimeToUnix(input)).toBe(1710374400); // Start of day UTC
    });

    it("converts EU format correctly", () => {
        const input = "14-03-2024";
        expect(convertDateTimeToUnix(input)).toBe(1710374400); // Start of day UTC
    });

    it("converts full written date correctly", () => {
        const input = "March 14, 2024 12:00:00";
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    it("converts abbreviated month format correctly", () => {
        const input = "Mar 14, 2024 12:00:00";
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    // Edge cases and invalid inputs
    it("handles empty string", () => {
        expect(convertDateTimeToUnix("")).toBe(NaN);
    });

    it("handles whitespace string", () => {
        expect(convertDateTimeToUnix("   ")).toBe(NaN);
    });

    it("handles invalid date string", () => {
        expect(convertDateTimeToUnix("not a date")).toBe(NaN);
    });

    it("handles invalid month", () => {
        expect(convertDateTimeToUnix("2024-13-14")).toBe(NaN);
    });

    it("handles invalid day", () => {
        expect(convertDateTimeToUnix("2024-03-32")).toBe(NaN);
    });

    // Special formats
    it("converts RFC 2822 format correctly", () => {
        const input = "Thu, 14 Mar 2024 12:00:00 GMT";
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    it("converts 12-hour time format correctly", () => {
        const input = "March 14, 2024 12:00:00 PM";
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });

    it("handles different timezone abbreviations", () => {
        const input = "March 14, 2024 22:00:00 AEST"; // Same time as above
        expect(convertDateTimeToUnix(input)).toBe(KNOWN_TIMESTAMP);
    });
}); 
