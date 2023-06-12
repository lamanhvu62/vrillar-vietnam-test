import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await axios.get('https://www.formula1.com/en/racing/2023.html');
        const html = response.data;
        const $ = cheerio.load(html);

        const hero: { cardTitle: string, raceStatus: string, startDate: string, endDate: string, place: string, title: string, image?: string }[] = []

        const cardTitle = $('.event-hero-wrapper a fieldset legend').text();
        const raceStatus = $('.hero-event').find('.race-status').text().trim();
        const startDate = $('.hero-event').find('.start-date').text().trim();
        const endDate = $('.hero-event').find('.end-date').text().trim();
        const place = $('.hero-event').find('.event-place').text().trim();
        const title = $('.hero-event').find('.event-title').text().trim();
        const image = $('.hero-event').find('.hero-track img').attr('src');


        hero.push({ cardTitle, raceStatus, startDate, endDate, place, title, image })


        return NextResponse.json({ hero });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
};

