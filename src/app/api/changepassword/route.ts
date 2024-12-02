import { NextRequest, NextResponse } from "next/server";
import { changePasswordSchema } from "@/packages/types/changePassword";
import DBClient from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = DBClient.getInstance().prisma;

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const parsedData = changePasswordSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    const { userId, currPassword, newPassword } = parsedData.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
    }

    if (user.password !== null) {
      if (currPassword !== null) {
        const passwordMatch = await bcrypt.compare(currPassword, user.password);
        if (!passwordMatch) {
          return NextResponse.json({ error: "Invalid old password!" }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: "Password exists for this user, please enter current password!" }, { status: 400 });
      }
    } else if (currPassword !== null) {
      return NextResponse.json({ error: "Password doesn't exist!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const res = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password Updated Successfully!", res }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
