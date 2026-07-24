import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Her testten sonra DOM'u temizle.
afterEach(() => {
  cleanup();
});

// jsdom IntersectionObserver'ı desteklemez; Navbar scroll-spy için no-op stub.
class IntersectionObserverStub {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
