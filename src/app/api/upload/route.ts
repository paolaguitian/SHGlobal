import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    const data = await req.json();
    console.log(data, "handle saving data");
    return NextResponse.json(data)

}

