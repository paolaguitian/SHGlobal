import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json();
        console.log(data, "data to save an handle")
        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })

    }
}

