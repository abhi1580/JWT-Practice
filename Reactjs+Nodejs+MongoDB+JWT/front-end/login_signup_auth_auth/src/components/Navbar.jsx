import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container" style={{ maxWidth: "1200px" }}>
          {/* Logo */}
          <Link to={"/"} className="navbar-brand ">
            MyApp
          </Link>

          {/* Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <div className="d-flex">
              <Link
                to={"/login"}
                className="btn btn-outline-dark me-2"
                type="button"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
