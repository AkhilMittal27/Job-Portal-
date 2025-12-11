import Navbar from '@/components/shared/Navbar';
import React from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';

const Signup = () => {

    return (
        <div>
            <Navbar />
            <div className='flex  justify-center max-w-[80rem]'>

                <form action="" className='w-1/2 border-gray-200 mb-4 rounded-md p-4 my-10'>
                    <div className='mb-4 font-bold text-xl' >Sign Up</div>
                    <div >
                        <Label className="mb-3">Full Name:</Label>
                        <input type="text" placeholder="Full Name" className="border p-2 w-full mb-4" />
                    </div>
                    <div>
                        <Label className="mb-3">Email:</Label>
                        <input type="text" placeholder="Email@gmail.com" className="border p-2 w-full mb-4" />
                    </div>
                    <div>
                        <Label className="mb-3">Phone Number:</Label>
                        <input type="Number" placeholder="Phone Number" className="border p-2 w-full mb-4" />
                    </div>
                    <div>
                        <Label className="mb-3" >Password</Label>
                        <input type="Password:" placeholder="Set the password" className="border p-2 w-full mb-4" />
                    </div>
                    <div>
                        <Label className="mb-5">Register As:</Label>
                        <RadioGroup defaultValue="option-one" className="flex gap-4 mb-5">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="option-one"
                                    name="registerAs"
                                    value="student"
                                />
                                <Label htmlFor="option-one">Student</Label>

                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="option-two"
                                    name="registerAs"
                                    value="Recruiter"
                                />
                                <Label htmlFor="option-one">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div>
                            <Label className="mb-3">Profile Photo:</Label>
                            <input type="file" accept="image/*" className="w-half cursor-pointer border p-2 w-full mb-4" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Sign Up</Button>
                </form>
            </div>
        </div>

    )
};

export default Signup;
