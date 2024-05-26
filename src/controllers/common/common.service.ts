import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';

@Injectable()
export class CommonService {
  private client: Axios = axios.create({
    baseURL: process.env.MAIN_DATA_HOST,
  });

  async getRecentList() {
    const params = {
      query:
        '\n    query recentAcSubmissions($userSlug: String!) {\n  recentACSubmissions(userSlug: $userSlug) {\n    submissionId\n    submitTime\n    question {\n      title\n      translatedTitle\n      titleSlug\n      questionFrontendId\n    }\n  }\n}\n    ',
      variables: {
        userSlug: 'ymgm',
      },
      operationName: 'recentAcSubmissions',
    };
    try {
      const data = await this.client.post(
        `${process.env.LEET_CODE_URL_NOJ}`,
        params,
      );
      return data.data;
    } catch (e) {
      console.log(e.message);
      return { code: 1, message: '获取数据失败!' };
    }
  }

  async getSessionProgress() {
    const params = {
      query:
        '\n    query userSessionProgress($userSlug: String!) {\n  userProfileUserQuestionSubmitStats(userSlug: $userSlug) {\n    acSubmissionNum {\n      difficulty\n      count\n    }\n    totalSubmissionNum {\n      difficulty\n      count\n    }\n  }\n  userProfileUserQuestionProgress(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      difficulty\n      count\n    }\n    numFailedQuestions {\n      difficulty\n      count\n    }\n    numUntouchedQuestions {\n      difficulty\n      count\n    }\n  }\n}\n    ',
      variables: {
        userSlug: 'ymgm',
      },
      operationName: 'userSessionProgress',
    };
    try {
      const data = await this.client.post(
        `${process.env.LEET_CODE_URL}`,
        params,
      );
      return data.data;
    } catch (e) {
      return { code: 1, message: '获取数据失败!' };
    }
  }
}
