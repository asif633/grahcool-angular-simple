import { GraphcoolAngularSimplePage } from './app.po';

describe('graphcool-angular-simple App', () => {
  let page: GraphcoolAngularSimplePage;

  beforeEach(() => {
    page = new GraphcoolAngularSimplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
