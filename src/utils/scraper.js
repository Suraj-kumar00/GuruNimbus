import puppeteer from 'puppeteer';

// Scrape all reviews of a professor and store it as a Review object in future implementation.
export default async function scraper(url) {
  const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
  const page = await browser.newPage();
  
  await page.goto(url);

  await page.setViewport({width: 1080, height: 1024});
  await closeModal(page)
  const fullName = await scrapeName(page) || null
  const ratingValue = await scrapeRatingValue(page) || null
  const difficulty = await scrapeDifficulty(page) || null
  const numOfRatings = await scrapeNumberOfRatings(page) || null
  const department = await scrapeDepartment(page) || null
  const school = await scrapeSchool(page) || null
  const reviews = await scrapeReviews(page) || null

  await browser.close();
  const scrapedData = {
    profName: fullName,
    profRatingValue: ratingValue,
    profDifficulty: difficulty,
    // this might be changed to a review object containing number of views and the actual reviews of students
    numOfRatings: numOfRatings,
    profDepartment: department,
    profSchool: school,
    profReviews: reviews,
  }
  return scrapedData
}  

const closeModal = async (page) => {
  const modalCloseSelector = '.Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw'
  await page.waitForSelector(modalCloseSelector, { visible: true })
  await page.click(modalCloseSelector)
}
const scrapeName = async (page) => {
  const nameSelector = '.NameTitle__Name-dowf0z-0.cfjPUG';
  const nameDiv = await page.waitForSelector(nameSelector);
  const fullName = await nameDiv?.evaluate(el => el.textContent.trim());
  return fullName
}
const scrapeDepartment = async (page) => {
  const depSelector = '.TeacherDepartment__StyledDepartmentLink-fl79e8-0.iMmVHb';
  const depDiv = await page.waitForSelector(depSelector);
  const department = await depDiv?.evaluate(el => el.textContent.trim());
  return department
}
const scrapeRatingValue = async (page) => {
  const ratingValNumeratorSelector = '.RatingValue__Numerator-qw8sqy-2.liyUjw';
  const ratingValDenominatorSelector = '.RatingValue__Denominator-qw8sqy-4.UqFtE';

  const numeratorElement = await page.waitForSelector(ratingValNumeratorSelector);
  const denominatorElement = await page.waitForSelector(ratingValDenominatorSelector);

  const numerator = await numeratorElement.evaluate(el => el.textContent.trim());
  const denominator = await denominatorElement.evaluate(el => el.textContent.trim());
  
  const ratingVal = `${numerator} ${denominator}`;

  return ratingVal;
}
const scrapeDifficulty = async (page) => {
  const parentSelector = '.TeacherFeedback__StyledTeacherFeedback-gzhlj7-0.cxVUGc';
  const itemSelector = '.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs';

  const parentDiv = await page.waitForSelector(parentSelector);
  
  const difficultyDivs = await parentDiv.$$(itemSelector);
  
  if (difficultyDivs.length < 2) {
    console.log('Not enough elements found');
    return null;
  }

  const difficulty = await difficultyDivs[1].evaluate(el => el.textContent.trim());

  return difficulty;
}
const scrapeNumberOfRatings = async (page) => {
  const numReviewSelector = '.RatingValue__NumRatings-qw8sqy-0.jMkisx';
  const numReviewDiv = await page.waitForSelector(numReviewSelector);
  const numOfRatings = await numReviewDiv?.evaluate(el => {
    const anchor = el.querySelector('div > div > a')
    const textContent = anchor.textContent.trim()
    const match = textContent.match(/\d+/);
    return match ? match[0] : null;
  });
  return numOfRatings
}
const scrapeSchool = async (page) => {
  const schoolSelector = '.NameTitle__Title-dowf0z-1.iLYGwn';
  const schoolDiv = await page.waitForSelector(schoolSelector);
  const school = await schoolDiv?.evaluate(el => {
    links = el.querySelectorAll('a')
    return links.length > 1 ? links[1].textContent.trim() : '';
  });
  return school
}
const scrapeReviews = async (page) => {
  const reviewSelector = '.Comments__StyledComments-dzzyvm-0.gRjWel';
  await page.waitForSelector(reviewSelector);
  const reviews = await page.$$eval(reviewSelector, (reviewDivs) => {
    return reviewDivs
      .map((div) => div.textContent.trim()) // Get text content and trim whitespace
      .filter(content => content !== 'No Comments'); // Filter out "No Comments"
  });
  
  return reviews;
}