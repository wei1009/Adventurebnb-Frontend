import React from "react";
import { render } from "@testing-library/react";
import HotelList from "./HotelList";
import { MemoryRouter } from "react-router";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <HotelList 
          hotelName ='test'
          image = 'https://photos.hotelbeds.com/giata/41/412145/412145a_hb_a_001.jpg' 
          street ='test street'
          city ='test'
          state = 'test'
          postalCode =' 12345'
          hotelFeature = 'test'
          web = '/'
          checkInDate = '2022-03-10'
          checkOutDate = '2022-03-12'
          hotelCode = '12345'
          adult ='2'
          children='3'
          />
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});