// tests/unit/convertTimeToTokens.spec.ts
import { describe, it, expect } from "vitest";
import { convertTimeToTokens } from "../utils";

describe("convertTimeToTokens", () => {
  it("infers tokens from full date and time string with timezone", () => {
    const input = "Fri Oct 18 2013 18:53:14 GMT+1000 (EST)";
    const expectedOutput = "%a %b %d %Y %H:%M:%S %Z";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from date with time and slash separators", () => {
    const input = "18/01/2024 18:11:24";
    const expectedOutput = "%d/%m/%Y %H:%M:%S";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from time-only string", () => {
    const input = "18:53:14";
    const expectedOutput = "%H:%M:%S";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from date-only string with dashes", () => {
    const input = "2024-01-18";
    const expectedOutput = "%Y-%m-%d";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from date-only string with slashes", () => {
    const input = "18/01/2024";
    const expectedOutput = "%d/%m/%Y";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from datetime string with month names", () => {
    const input = "January 18, 2024 18:53";
    const expectedOutput = "%B %d, %Y %H:%M";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from datetime string with abbreviated month names", () => {
    const input = "Jan 18, 2024 18:53";
    const expectedOutput = "%b %d, %Y %H:%M";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  // not sure how we could handle a month/day/year vs. a day/month/year situation
  it("handles 12-hour format with AM/PM", () => {
    const input = "01/18/2024 06:30:00 PM";
    const expectedOutput = "%m/%d/%Y %H:%M:%S %p";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("handles 12-hour format without seconds and with AM/PM", () => {
    const input = "18/01/2024 06:30 PM";
    const expectedOutput = "%d/%m/%Y %H:%M %p";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from a string with only year and month", () => {
    const input = "2024-01";
    const expectedOutput = "%Y-%m";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("handles a string with just the year", () => {
    const input = "2024";
    const expectedOutput = "%Y";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  // in future update ensure that this will give a warning of improper datetime format
  it("returns an empty string when given an invalid date string", () => {
    const input = "Hello, World!";
    const expectedOutput = "Hello, World!";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });
  // in future update ensure that this will give a warning of improper datetime format
  it("returns empty string when given random text", () => {
    const input = "abc 123 def 456";
    const expectedOutput = "abc 123 def 456";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from ISO 8601 format", () => {
    const input = "2024-01-18T18:11:24Z";
    const expectedOutput = "%Y-%m-%dT%H:%M:%SZ";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

  it("infers tokens from RFC 2822 format", () => {
    const input = "Thu, 18 Jan 2024 18:11:24 GMT";
    const expectedOutput = "%a, %d %b %Y %H:%M:%S %Z";
    expect(convertTimeToTokens(input)).toBe(expectedOutput);
  });

});
