import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/Provider/theme-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "@/components/Provider/AuthProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOutUser } = useContext(UserContext);
  // console.log(user?.photoURL);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
const navigate = useNavigate();
  const handleLogout = () => {
    signOutUser();
    navigate("/user/login")
  };

  return (
    <Card className="container mx-auto py-1 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <div>
        <Link to="/" className="text-xl whitespace-pre-wrap font-bold w-fit">
          <img src={logo} alt="" />
        </Link>
      </div>

      <ul className="hidden lg:flex items-center gap-10 text-card-foreground">
        <li className="text-primary font-medium">
          <Button variant="headerD"><Link to="/">Home</Link></Button>
        </li>
        <li>
        <Button variant="headerD"><Link to="/all-needed-posts">Need Volunteer</Link></Button>
        </li>
        {user && (
          <li>
            <Button variant="headerD"><Link to="/user/myprofile">My Profile</Link></Button>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        <div className="flex w-full lg:hidden mr-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-white text-black border flex flex-col gap-2 border-border rounded-lg shadow-lg mt-2 p-2"
            >
              <DropdownMenuItem className="hover:bg-primary flex md:hidden justify-center items-center w-fit mx-auto hover:text-white px-4 py-2 rounded-md">
                <Link to="/user/myprofile" title="My Profile">
                  {user && (
                    <div className="flex gap-2 items-center justify-center w-fit ">
                      <img
                        src={user?.photoURL || "no"}
                        alt="profile picture"
                        className="rounded-full w-16"
                      />
                    </div>
                  )}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                <Link to="/all-needed-posts">Need Volunteer</Link>
              </DropdownMenuItem>
              {user && (
                <DropdownMenuItem className="hover:bg-primary hover:text-white px-4 py-2 rounded-md">
                  <Link to="/user/myprofile">My Profile</Link>
                </DropdownMenuItem>
              )}

              <div className="flex w-full flex-col gap-3 justify-center items-center md:hidden">
                <Link to="/all-needed-posts" className=" w-full ml-2 mr-2">
                  <Button className="w-full">Be A Volunteer</Button>
                </Link>
                {user?.email ? (
                  <div className="flex gap-2 items-center justify-center w-full ">
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className=" w-full">
                    <Button className="w-full px-2">
                      <Link to="/user/login" variant="secondary">
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* USer Checking */}
        <div className="hidden md:flex gap-5 items-center justify-center w-full">
          <Button className="hidden md:block mr-10" variant="destructive">
            <Link to="/all-needed-posts">Be A Volunteer</Link>
          </Button>
          {user?.email ? (
            <div className="flex gap-2 items-center justify-center w-full ">
              <img
                src={user?.photoURL || "no"}
                alt="profile picture"
                className="rounded-full w-16"
              />
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <Link to="/user/login">
                <Button
                  className="hidden md:block w-full px-2"
                  variant="destructive"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Button variant="destructive" onClick={toggleTheme}>
        {theme !== "dark" ? <Moon /> : <Sun />}
      </Button>
    </Card>
  );
};

export default Header;
