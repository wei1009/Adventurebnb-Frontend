import React from "react";
import { render } from "@testing-library/react";
import TravelInfo from "../Home/TravelInfo";
import { MemoryRouter } from "react-router";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <TravelInfo />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});