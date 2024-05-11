import { getReportById, getMatchingReports, Report } from '@/app/services/reports';
import getPetComparisonResult from './pet-comparison';

const SCORE_THRESHOLD = 3;

const PICTURE_MATCH_SCORE = {
  HIGH: 3,
  MEDIUM: 1,
  LOW: -1,
};

const getPictures = (report: Report) => {
  return [report.pictureUrl1, report.pictureUrl2, report.pictureUrl3].filter(Boolean) as string[];
};

const searchForMatchingReports = async (reportId: number) => {
  const report = await getReportById(reportId);
  const coincidences = await getMatchingReports(reportId);
  const images1 = getPictures(report);

  const picturesMatchingScores: Record<number, number> = {};
  const bestResults: Report[] = [];
  const otherResults: Report[] = [];

  await Promise.all(
    coincidences.map(async coincidence => {
      // Compare Images
      const images2 = getPictures(coincidence);
      const matchingScore = await getPetComparisonResult(images1, images2);
      picturesMatchingScores[coincidence.id] = PICTURE_MATCH_SCORE[matchingScore];

      // Compare Description
      if (report.gender && report.gender === coincidence.gender) {
        picturesMatchingScores[coincidence.id] += 1;
      }
      if (report.breed && report.breed === coincidence.breed) {
        picturesMatchingScores[coincidence.id] += 1;
      }
      if (report.color && report.color === coincidence.color) {
        picturesMatchingScores[coincidence.id] += 0.5;
      }
      if (report.size && report.size === coincidence.size) {
        picturesMatchingScores[coincidence.id] += 0.5;
      }

      if (picturesMatchingScores[coincidence.id] >= SCORE_THRESHOLD) {
        bestResults.push(coincidence);
      } else {
        otherResults.push(coincidence);
      }
    })
  );

  // Sort in descending order
  return {
    bestResults: bestResults.sort((a, b) => picturesMatchingScores[b.id] - picturesMatchingScores[a.id]),
    otherResults: otherResults.sort((a, b) => picturesMatchingScores[b.id] - picturesMatchingScores[a.id]),
  };
};

export default searchForMatchingReports;
