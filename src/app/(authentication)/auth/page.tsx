"use client";

import { Button } from "@/app/components/ui/button";
import TextBlock from "@/app/components/ui/TextBlock";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { BiShapePolygon } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { sbBrowserClient } from "@/sb/SBClient";
import { createAccountByEmail } from "@/operations/createAccountByEmail";

const defaultAuthPage = () => {

    const [isAuthenticating, setIsAuthenticating] = useState(false);


    const formSchema = z.object({
        email: z.string().email({message:"put a valid email"}).min(4, { message: 'Email must be above 4 characters' }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsAuthenticating(true);
            const res = await createAccountByEmail(values);
            const { data, error } = JSON.parse(res);
            if (error) {
                console.warn('Log in error:', error);
                return;
            }
            // Handle successful login if needed
        } catch (err) {
            console.error('An unexpected error occurred:', err);
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function socialLogin(provider:Provider) {
        setIsAuthenticating(true);
        await sbBrowserClient.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${location.origin}/auth/callback`, },
        });
        setIsAuthenticating(false);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
            <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
                <div className="flex justify-center items-center gap-4 mb-8">
                    <BiShapePolygon size={60} className="text-blue-600" />
                    <TextBlock
                        variant="h2"
                        content="TeamNexus"
                        customClass="text-4xl font-extrabold text-gray-900"
                    />
                </div>
                <TextBlock
                    variant="h3"
                    content="Sign in to your account"
                    customClass="mb-6 text-2xl font-semibold text-gray-800"
                />
                <TextBlock
                    variant="p"
                    content="Enter your email and password to access your account"
                    customClass="mb-10 text-gray-600"
                />

                <div className="flex flex-col space-y-4 mb-6">
                    <Button disabled={isAuthenticating}  variant="outline" className="flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50 transition duration-200"
                    onClick={() => socialLogin("google")}>
                        <FcGoogle size={24} />
                        <TextBlock
                            className="text-lg"
                            content="Sign in with Google"
                            variant="p"
                        />
                    </Button>
                    <Button  disabled={isAuthenticating} variant="outline" className="flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50 transition duration-200"
                    onClick={() => socialLogin("github")}>
                        <RxGithubLogo size={24} />
                        <TextBlock
                            className="text-lg"
                            content="Sign in with Github"
                            variant="p"
                        />
                    </Button>
                </div>
                <div>
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300" />
                        <TextBlock content="OR" variant="p" customClass="mx-4 text-gray-500" />
                        <div className="flex-1 border-t border-gray-300" />
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <fieldset disabled={isAuthenticating}>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder='name@work-email.com' {...field} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    variant='secondary'
                                    className='bg-blue-600 hover:bg-blue-700 w-full my-5 text-white transition duration-200'
                                    type='submit'
                                >
                                    <TextBlock content='Sign in with Email' variant='p' />
                                </Button>

                                <div className='px-5 py-4 bg-gray-100 rounded-md'>
                                    <div className='text-gray-500 flex items-center space-x-3'>
                                        <MdOutlineAutoAwesome />
                                        <TextBlock
                                            content='We will email you a magic link for a password-free sign-in'
                                            variant='p'
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default defaultAuthPage;