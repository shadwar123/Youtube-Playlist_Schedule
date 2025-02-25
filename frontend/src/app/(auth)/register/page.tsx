import Register from "@/components/auth/Register";
import Link from "next/link";
import React from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/app/actions/authActions";
import { SubmitButton } from "@/components/common/SubmitButton";

export default async function register() {
//   const session = await getServerSession(authOptions);
//   if (session !== null) {
//     redirect("/dashboard");
//   }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full px-10 md:w-[550px] shadow-md rounded-xl py-5 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash
          </h1>
          <h1 className="text-3xl font-bold">Register</h1>
          <p>Start clashing now</p>
        </div>
        <Register />
        {/* this form is been removed so that we can use State and Hooks but this is server sider */}
        {/* <form action={registerAction}>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name.."/>
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email.."/>
          </div>
          <div className="mt-4">
            <Label htmlFor="name">Password</Label>
            <Input id="Password" name="Password" placeholder="Enter your Password.."/>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="name">Confirm password</Label>
            <Input id="confirm password" name="confirm password" placeholder="Enter your confirm password.."/>
          </div>
          <div className="mt-4">
            <SubmitButton/>
          </div>
        </form> */}
        <p className="text-center mt-2">
          Already have an account ?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}