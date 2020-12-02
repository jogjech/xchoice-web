import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import AuthPage from "../../pages/auth";

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      route: "/",
      pathname: "",
      query: { returnTo: "/dashboard" },
    };
  },
}));

describe("Auth page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthPage></AuthPage>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
