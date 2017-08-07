import { GDCHelperPage } from './app.po';

describe('gdchelper App', () => {
  let page: GDCHelperPage;

  beforeEach(() => {
    page = new GDCHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
