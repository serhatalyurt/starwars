import { Link } from "react-router-dom";
import logo from "../logo.svg";

const NavBar: React.FC = ({ children }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert("You can shared the copied item!");
      },
      (err) => {
        console.error(err);
        alert("Failed to copy");
      }
    );
  };
  return (
    <nav>
      <Link to={`/`} className="logo">
        <img src={logo} className="logo" alt="Star Wars" />
      </Link>
      {children}
      <button onClick={copyToClipboard}>Share</button>
    </nav>
  );
};

export default NavBar;
