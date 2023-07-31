import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";
import { GiHotMeal } from "react-icons/gi";
import Create from "../firebase_setup/create";
import { CgTag } from "react-icons/cg";


/**
 * 
 * @returns on sumbit runs the action function
 */


export async function action() {
  const recipe = await Create({});
  return redirect(`/recipes/${recipe.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="header">
          <NavLink to={`homepage`} >
          <div style={{display: "flex", flexDirection: "row"}}>
            <GiHotMeal style={{color: "pink", fontSize: "3rem", paddingRight: "10px", paddingTop: "20px"}}/>
            <p style={{fontSize: "2rem", lineHeight: "1"}}>My recipe journal</p>
            </div>
          </NavLink>
        <div>
          <NavLink to={`lunch`}>
          <CgTag/>Lunch
          </NavLink>
        </div>
        <div>
          <NavLink to={`vegetarian`}>
            Vegetarian
          </NavLink>
        </div>
        <div id="headerRight">
          <Form method="post">
            <button type="submit">New</button>
          </Form>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
              }}
            />
            {/* <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            /> */}
            <div
              className="sr-only"
              aria-live="polite"
            >
            </div>
          </Form>
        </div>
      </div>
      <div id="detail" className={
        navigation.state === "loading" ? "loading" : ""
      }>
      </div>
      <Outlet />
    </>
  );
}