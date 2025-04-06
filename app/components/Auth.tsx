import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Auth = () => {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* Profile dropdown */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-gradient-to-r from-[#5B389B] to-[#975EFF] text-white hover:cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: 36,
                height: 36,
              },
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

export default Auth;
