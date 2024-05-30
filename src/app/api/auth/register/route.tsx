import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "@/packages/types";
import bcrypt from "bcrypt"


export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const parsedData = userSchema.safeParse(data);

    if(parsedData.error){
        return NextResponse.json(parsedData.error, {status: 400})
    }

    const {fullname, email, password} = parsedData?.data
    const prisma = new PrismaClient();



    try{

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                fullname,
                email,
                password : hashedPassword
            }
        })

        return NextResponse.json(user, {status: 201});

        
        
    }catch(err){
        return NextResponse.json(err, {status: 400})
    }
}