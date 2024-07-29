import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import React from 'react';

export const Login = () => {
    const queryClient = useQueryClient();

    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        if (!googleToken) return toast.error("Something went wrong");

        const { verifyGoogleToken } = await graphqlClient.request(
            verifyUserGoogleToken, { token: googleToken }
        );
        toast.success("Verified Success");

        if (verifyGoogleToken) {
            window.localStorage.setItem('token', verifyGoogleToken);
            queryClient.invalidateQueries({ queryKey: ['current-user'] });
        }
    }, [queryClient]);

    return (
        <div className="flex   mt-2 min-h-max">
            <div className="p-8 bg-neutral-900 shadow-lg rounded-lg max-w-sm w-full">
                <h1 className="mb-4 text-3xl font-bold text-center text-white">Join Twitter today</h1>
                <div className="flex justify-center mb-4">
                    <GoogleLogin onSuccess={handleLoginWithGoogle} />
                </div>
            </div>
        </div>
    );
};

