import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "@/packages/types/user";
import bcrypt from "bcrypt"


export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const parsedData = userSchema.safeParse(data);

    if(parsedData.error){
        return NextResponse.json(parsedData.error, {status: 400})
    }


    const {name, email, password} = parsedData?.data
    const prisma = new PrismaClient();



    try{

        if(!password) return NextResponse.json("Password Not Found!", {status: 404})
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(userExists) {
            return NextResponse.json("User Already Exists!", {status: 400})
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password : hashedPassword
            }
        })

        return NextResponse.json(user, {status: 201});

        
        
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}