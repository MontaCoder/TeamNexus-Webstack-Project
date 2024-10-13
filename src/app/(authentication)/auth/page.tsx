import { Button } from "@/app/components/ui/button";
import TextBlock from "@/app/components/ui/TextBlock";
import { BiShapePolygon } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

const defaultAuthPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-center items-center gap-4 mb-6">
                    <BiShapePolygon size={55} className="text-blue-500" />
                    <TextBlock
                        variant="h2"
                        content="TeamNexus"
                        customClass="text-3xl font-bold text-gray-800"
                    />
                </div>
                <TextBlock
                    variant="h2"
                    content="Sign in to your account"
                    customClass="mb-4 text-xl font-semibold text-gray-700"
                />
                <TextBlock
                    variant="p"
                    content="Enter your email and password to access your account"
                    customClass="mb-8 text-gray-600"
                />

                <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50">
                        <FcGoogle size={24} />
                        <TextBlock
                            className="text-lg"
                            content="Sign in with Google"
                            variant="p"
                        />
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50">
                        <RxGithubLogo size={24} />
                        <TextBlock
                            className="text-lg"
                            content="Sign in with Github"
                            variant="p"
                        />
                    </Button>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300" />
                    <TextBlock content="OR" variant="p" customClass="mx-4 text-gray-500" />
                    <div className="flex-1 border-t border-gray-300" />
                </div>
            </div>
        </div>
    );
};

export default defaultAuthPage;