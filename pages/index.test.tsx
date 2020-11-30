import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Home from "./index";

const mockRouterPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: mockRouterPush,
    };
  },
}));

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => {
    return {
      isAuthenticated: true,
      user: {
        nickname: "Kevin Wang",
      },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    };
  },
}));

describe("Home page", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home></Home>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains layout", () => {
    const layout = wrapper.find("Layout");
    expect(layout.exists()).toBeTruthy();
    expect(layout.prop("title")).toBe("X Choice");
  });

  it("contains title", () => {
    const title = wrapper.find(".title");
    expect(title.text()).toBe("Welcome back, Kevin Wang!");
  });

  it("contains button to create survey", () => {
    const button = wrapper.find("Button");
    expect(button.text()).toBe("Create Survey Now");
    button.simulate("click");
    expect(mockRouterPush).toHaveBeenCalledWith("/survey/create");
  });
});
