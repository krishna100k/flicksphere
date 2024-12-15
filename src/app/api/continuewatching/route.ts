import { NextRequest, NextResponse } from "next/server";
import { ContinueWatching } from "@/packages/types/continueWatching";
import DBClient from '@/lib/prisma'
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const prisma = DBClient.getInstance().prisma

export const POST = async (req: NextRequest) => {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }


    const data = await req.json();
    const parsedData = ContinueWatching.safeParse(data);

    if(!parsedData.success){
        return NextResponse.json(parsedData.error, {status: 400})
    }

    const { userId, movieId, contentName, category, season, episode, imageUrl} = parsedData.data;


    try{

        const item = await prisma?.continueWatching?.findMany({
            where:{
                userId,
                movieId,
                category
            }
        })

        if (item.length > 0) {
            if (category === "movie") {
                return NextResponse.json("Movie Already Exists", { status: 200 });
            } else if (category === "tv" && item[0].season === season && item[0].episode === episode) {
                return NextResponse.json("Episode or Season Already Exists In Continue Watching", { status: 200 });
            } else if (category === "tv") {
                const updated = await prisma.continueWatching.updateMany({
                    where: {
                        userId: item[0].userId,
                        movieId: item[0].movieId,
                        category: item[0].category
                    },
                    data: {
                        season,
                        episode
                    }
                });
    
                console.log(updated);
    
                return NextResponse.json("Updated TV show progress", { status: 200 });
            }
        }

        const res = await prisma.continueWatching.create({
            data: {
                userId,
                movieId,
                contentName,
                category,
                imageUrl,
                season,
                episode
            }
        })


        return NextResponse.json(res, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json(err, {status: 400})
    }
}

export const GET = async (req: NextRequest) => {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json("Id Not Found!", { status: 404 });
    }

    try {
        const data = await prisma.continueWatching.findMany({
            where: {
                userId: id
            },
            orderBy: {
                updatedAt: "desc"
            }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if(!id){
        return NextResponse.json("Id Not Found!", { status: 404 });
    }

    try{
        const res = await prisma.continueWatching.delete({
            where:{
                id
            }
        });

        return NextResponse.json(res, {status: 200});
    }catch(err){
        return NextResponse.json(err, {status: 400});
    }
}
