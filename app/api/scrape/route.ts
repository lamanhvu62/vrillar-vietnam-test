import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = 'https://www.formula1.com/';
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const surnames: string[] = [];

        $('.f1-podium--surname').each((_index, element) => {
            const surname = $(element).text().trim();
            surnames.push(surname);
        });
        return NextResponse.json(surnames);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
};

