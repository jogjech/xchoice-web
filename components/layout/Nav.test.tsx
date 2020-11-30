import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Nav from "./Nav";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => {
    return {
      isAuthenticated: true,
      user: {},
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    };
  },
}));

describe("Nav bar", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav></Nav>);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("contains menu when user logged in", () => {
    const menu = wrapper.find("Menu");
    expect(menu.exists()).toBeTruthy();
    const menuItems = menu.children();
    const links = menuItems.map((menuItem) => menuItem.children());
    expect(links.length).toBe(3);
    expect(links[0].prop("href")).toBe("/survey/create");
    expect(links[0].children().text()).toBe("Create Survey");
    expect(links[1].prop("href")).toBe("/dashboard");
    expect(links[1].children().text()).toBe("My Surveys");
    expect(links[2].children().text()).toBe("Logout");
  });

  it("contains logo", () => {
    const logo = wrapper.find(".logo");
    expect(logo.exists()).toBeTruthy();
    expect(logo.childAt(0).text()).toBe("X Choice");
  });
});
