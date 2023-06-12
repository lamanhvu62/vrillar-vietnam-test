import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const body = await req.json();
        const { data } = body
        try {
            const response = await axios.get('https://www.formula1.com' + data.url);
            const html = response.data;
            const $ = cheerio.load(html);
            const dataYear: { year?: string, yearLink?: string }[] = [];
            const dataType: { type?: string, typeLink?: string }[] = [];
            const dataMeetingKey: { meetingKey?: string, meetingKeyLink?: string }[] = [];
            const table: { th?: string }[] = [];
            const tableTd: Array<any> = [];


            $('.resultsarchive-filter-item').each((_index, element) => {
                const year = $(element).find("a[data-name='year'] span").text().trim();
                const yearLink = $(element).find("a[data-name='year']").attr('href');
                if (year) {
                    dataYear.push({ year, yearLink });
                }
            });

            $('.resultsarchive-filter-item').each((_index, element) => {
                const type = $(element).find("a[data-name='apiType'] span").text().trim();
                const typeLink = $(element).find("a[data-name='apiType']").attr('href');
                if (type) {
                    dataType.push({ type, typeLink });
                }
            });

            $('.resultsarchive-filter-container div:nth-child(3) li').each((_index, element) => {
                //const meetingKey = $(element).find("a[data-name='meetingKey'] span").text().trim();
                //const meetingKeyLink = $(element).find("a[data-name='meetingKey']").attr('href');
                const meetingKey = $(element).find("a span").text().trim();
                const meetingKeyLink = $(element).find("a").attr('href');
                if (meetingKey) {
                    dataMeetingKey.push({ meetingKey, meetingKeyLink });
                }
            });

            $('.resultsarchive-table tr th').each((_index, element) => {
                const th = $(element).text().trim();
                if (th) {
                    table.push({ th });
                }
            })

            $('.resultsarchive-table tr').each((_index, element) => {
                const td = $(element)
                    .find('td')
                    .map((index, td) => $(td).text().replace(/\s+/g, " ").replace(/\n/g, ""))
                    .get()
                    .filter((value) => value !== '');
                tableTd.push(td);
            })


            return NextResponse.json({ dataYear, dataType, dataMeetingKey, table, tableTd });
        } catch (error) {
            return new NextResponse("Internal Error", { status: 500 });
        }
    }
};

