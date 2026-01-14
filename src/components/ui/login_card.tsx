import {Button} from "../ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "../ui/card";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import LOGO from "../../assets/logo.png";
import PasswordInput from "../password-input";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADMIN_SIGNIN} from "../../graphql/admin.ts";

export function CardWithForm() {
    // const {setAuth} = useContext(Context)
    const [currentPassword, setCurrentPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    const [AdminSignIn] = useMutation(ADMIN_SIGNIN)

    useEffect(() => {
        if (window.localStorage.getItem("login")) {
            navigate("/dashboard");
        }
    })

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {

            const res = await AdminSignIn({
                variables: {
                    phone: username,
                    password: currentPassword
                }
            })
            
            const token = res.data.AdminSignIn.token;
            
            // Decode JWT to get admin_role
            let adminRole = 'staff';
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const decoded = JSON.parse(jsonPayload);
                adminRole = decoded.admin_role || 'staff';
                
                // Store both token and role
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("admin_role", adminRole);
                
                console.log('Logged in as:', adminRole); // For debugging
            } catch (decodeError) {
                console.error('Error decoding token:', decodeError);
                // Fallback: still store token, default to staff
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("admin_role", "staff");
            }
            
            // Redirect based on role
            // Admin: goes to dashboard (full access)
            // Staff: goes to drivers page (first accessible page)
            if (adminRole === 'admin') {
                navigate("/dashboard");
            } else {
                navigate("/drivers"); // Staff's first accessible page
            }
        } catch (e) {
            alert("wrong username or password")

        }
    };


    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className=" text-center text-2xl text-yellow-400">
                    <img className=" mx-auto h-[50px]" src={LOGO}></img>
                </CardTitle>
                <CardDescription className="text-center">
                    Welcome to EAXI Admin
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Phone Number</Label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="name"
                                placeholder="Please enter username"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Password</Label>
                            <PasswordInput
                                id="current_password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-between">
                <Button onClick={handleLogin} className="w-full">Login</Button>
                <p className="text-xs md:text-md my-[20px] text-gray-400">
                    Copyright © {new Date().getFullYear()} EAXI. All right reserved.
                </p>
            </CardFooter>
        </Card>
    );
}
