import React from "react";
import { render } from "@testing-library/react";
import TravelInfo from "./TravelInfo";
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