import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/Provider/theme-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "@/components/Provider/AuthProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOutUser } = useContext(UserContext);
  console.log(user?.photoURL);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    signOutUser();
  };

  return (
    <Card className="container mx-auto bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <div>
        <Link to="/" className="text-xl whitespace-pre-wrap font-bold w-fit">
          <img src={logo} alt="" />
        </Link>
      </div>

      <ul className="hidden lg:flex items-center gap-10 text-card-foreground">
        <li className="text-primary font-medium">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/allposts">Need Volunteer</Link>
        </li>
        <li>
          <Link to="/myprofile">My Profile</Link>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <div className="flex lg:hidden mr-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-card border border-border rounded-lg shadow-lg mt-2 p-2"
            >
              <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                <Link to="/allposts">Need Volunteer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                <Link to="/myprofile">My Profile</Link>
              </DropdownMenuItem>

              <div className="block md:hidden ">
                <DropdownMenuItem>
                  <Button className="w-full text-sm">
                    <Link to="/user/login" variant="secondary">
                      Login
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full text-sm">
                    <Link to="/user/be-a-volunteer">Be A Volunteer</Link>
                  </Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* USer Checking */}
        <div>
          { user?.email ? (
            <div className="flex gap-2 items-center justify-center w-fit ">
              <img src={user?.photoURL || "no"} alt="profile picture" className="rounded-full w-16"/>
              <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <Button className="hidden md:block w-full ml-2 mr-2">
                <Link to="/user/be-a-volunteer">Be A Volunteer</Link>
              </Button>
              <Button className="hidden md:block w-full px-2">
                <Link to="/user/login" variant="secondary">
                  Login
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button onClick={toggleTheme}>
        {theme !== "dark" ? <Moon /> : <Sun />}
      </Button>
    </Card>
  );
};

export default Header;
