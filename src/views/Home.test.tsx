import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { useCurrentUser } from "../utiles/useUserStore";

jest.mock("../utiles/useUserStore");

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});
describe("Home component", () => {
  const currentUser = useCurrentUser();
  it("renders without errors", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(getByText("Properties")).toBeInTheDocument();
  });

  it("displays the 'Filter' button", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(getByText("Filter")).toBeInTheDocument();
  });

  it("does not display 'Add Property' button for a non-admin user", () => {
    const normalUser = {
      username: "user",
      password: "123",
      role: "user",
    };
    const store = {
      currentUser: normalUser,
    };
    (useCurrentUser as jest.Mock).mockReturnValue(store);
    const addPropertyButton = screen.queryByRole("button", {
      name: /add property/i,
    });
    expect(addPropertyButton).toBeNull();
  });

  it("displays 'Add Property' button for an admin user", () => {
    const adminUser = {
      username: "parastoo",
      password: "123",
      role: "admin",
    };
    (useCurrentUser as jest.Mock).mockReturnValue(adminUser);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const addPropertyButton = screen.getByRole("button", {
      name: /add property/i,
    });
    expect(addPropertyButton).toBeInTheDocument();
  });
});
