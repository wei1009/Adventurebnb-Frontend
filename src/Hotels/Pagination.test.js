import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";
import { MemoryRouter } from "react-router";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <Pagination/>
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});