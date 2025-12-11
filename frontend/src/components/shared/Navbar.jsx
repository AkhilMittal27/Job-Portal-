import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false; // change to true to see the avatar popover

    return (
        <div className="bg-white shadow-md px-6 ">
            <div className="flex items-center justify-between h-16 mx-auto">
                <div>
                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <ul className="flex font-medium items-center gap-5">
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>

                    <div>
                        {!user ? (
                            <div>
                                <Link to="/login">
                                    <Button variant="default">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="ml-2 hover: bg-blend-lighten">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div>
                                        <h1 className="font-medium mb-2.5">Akhil Mittal</h1>
                                        <p className="text-sm text-muted-foreground">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Est architecto, sapiente assumenda deleniti doloremque
                                            harum ea asperiores iure consequuntur.
                                        </p>
                                    </div>

                                    <div className="mt-5 space-y-2">
                                        <div className="flex w-fit items-center cursor-pointer">
                                            <User2 className="mr-2" />
                                            <Button variant="link">View Profile</Button>
                                        </div>
                                        <div className="flex w-fit items-center cursor-pointer">
                                            <LogOut className="mr-2" />
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
