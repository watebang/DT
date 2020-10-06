import { NotFound, Forbidden } from 'lin-mizar';
import { Survey } from '../model/survey';

class SurveyDao {
  async getSurvey (id) {
    const survey = await Survey.findOne({
      where: {
        id
      }
    });
    return survey;
  }

  async getSurveys (v) {
    const start = v.get('query.page');
    const count1 = v.get('query.count');
    const { rows, count } = await Survey.findAndCountAll({
      offset: start * count1,
      limit: count1,
      order: [['create_time', 'DESC']]
    });
    console.log('rows=> ', rows);
    return {
      rows,
      total: count
    }
  }

  async createSurvey (v) {
    const survey = await Survey.findOne({
      where: {
        title: v.get('body.title')
      }
    });
    if (survey) {
      throw new Forbidden({
        code: 10240
      });
    }
    const sy = new Survey();
    sy.title = v.get('body.title');
    sy.status = v.get('body.status');
    sy.header_desc = v.get('body.header_desc');
    sy.footer_desc = v.get('body.footer_desc');
    sy.detail = v.get('body.detail');
    await sy.save();
  }

  async updateSurvey (v, id) {
    const survey = await Survey.findByPk(id);
    if (!survey) {
      throw new NotFound({
        code: 10022
      });
    }
    survey.title = v.get('body.title');
    survey.status = v.get('body.status');
    survey.header_desc = v.get('body.header_desc');
    survey.footer_desc = v.get('body.footer_desc');
    survey.detail = v.get('body.detail');
    await survey.save();
  }

  async deleteSurvey (id) {
    const survey = await Survey.findOne({
      where: {
        id
      }
    });
    if (!survey) {
      throw new NotFound({
        code: 10022
      });
    }
    survey.destroy();
  }
}

export { SurveyDao };