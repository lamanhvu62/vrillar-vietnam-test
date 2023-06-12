import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const url = 'https://www.formula1.com/en/results.html/2023/drivers.html';
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const surnames: { firstName: string, lastName: string, nation: string, car: string, point: string }[] = [];

        $('.resultsarchive-table tbody tr').map((_index, element) => {
            const firstName = $(element).find('.hide-for-tablet').text().trim();
            const lastName = $(element).find('.hide-for-mobile').text().trim();
            const nation = $(element).find('td:nth-child(4)').text().trim();
            const car = $(element).find('td:nth-child(5)').text().trim();
            const point = $(element).find('td:nth-child(6)').text().trim();
            surnames.push({ firstName, lastName, nation, car, point });
        });


        return NextResponse.json(surnames);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
};

