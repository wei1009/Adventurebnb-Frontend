import React from "react";
import { render } from "@testing-library/react";
import HotelDetail from "../Hotels/HotelDetail";
import { MemoryRouter } from "react-router";

// TODO: woefully under-tested!

it("matches snapshot", function () {
    const facilities=["test","test"]
  const { asFragment } = render(
      <MemoryRouter>
        <HotelDetail 
          hotelName ='test'
          image = 'https://photos.hotelbeds.com/giata/41/412145/412145a_hb_a_001.jpg' 
          address ='test street, test, test 12345'
          description = 'test'
          facilities = {facilities}
          issue ='test'
          mapInfo = "/"
          />
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});