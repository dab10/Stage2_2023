export const FIRST_LEVEL = 0;

export const START_NEST_LEVEL = 0;

export const TEXT_APPEARANCE_TIME = 10;

export const initialState = {
  currentLevel: FIRST_LEVEL,
  completeLevels: [],
  completeLevelsWithHints: [],
};

export const footerStart = `
<div class="footer-year">2023</div>
<div>
    <a class="footer-github" href="https://github.com/dab10">github</a>
</div>
<a href="https://rs.school/js/">
    <div class="footer-rss-image"></div>
</a>
`;
