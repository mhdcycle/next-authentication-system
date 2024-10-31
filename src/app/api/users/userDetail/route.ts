import { connect } from "@/dbConfig/dbCofig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({ message: "User Fetched Successfully", data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

connect();
