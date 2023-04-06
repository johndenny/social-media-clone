import { createGlobalStyle } from "styled-components";
import spriteCore2x from "../assets/images/sprite_core_2x.png";
import spriteGlyphs from "../assets/images/sprite_glyphs.png";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-background: 255, 255, 255;
    --secondary-background: 250, 250, 250; 
    --highlight-background: 239, 239, 239;
    --stroke: 219, 219, 219;
    --focus-stroke: 168, 168, 168;
    --primary-text: 38, 38, 38;
    --secondary-text: 142, 142, 142;
    --tertiary-text: 199, 199, 199;
    --link-blue: 0, 55, 107;    
    --secondary-blue: 224, 241, 255;
    --primary-button: 0, 149, 246;
    --slim-button: 5px 9px;
    --wide-button: 5px 28px;
    --error: 237, 73, 86;
    --badge: 255, 48, 65;
    --primary-button: 0, 149, 246;
    --cyan-5: #27c4f5;
    --purple-5: #a307a3;
    --orange-5: #fd8d32;
    --green-5: #58c322;
    --modal-backdrop: rgba(0, 0, 0, .65);
    --always-white: 255, 255, 255;
  }

  * {
    box-sizing: border-box;
  }  
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  body, button, input, textarea {
    color: rgba(38,38,38,1);
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 18px;
  }

  #root, article, div, footer, header, main, nav, section {
    align-items: stretch;
    border: 0 solid #000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    position: relative;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  #root {
    min-height: 100%;
  }

  html {
    overflow-y: scroll;
  }

  body, button, input, textarea {
    color: #262626;
    color: rgba(var(--i1d,38,38,38),1);
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 18px;
  }

  button {
    border: 0;
    padding: 0;
    background-color: transparent;
    display: flex;
    cursor: pointer;
  }

  a, a:visited {
    color: rgb(0,55,107);
    text-decoration: none;
  }

  .coreSpriteNotificationLeftChevron, .coreSpriteLockSmall, .coreSpriteMobileNavTypeLogo, .coreSpriteFacebookIconInverted {
    background-image: url(${spriteCore2x});
  }

  .glyphsSpriteEmail_confirm {
    background-image: url(${spriteGlyphs});
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px rgba(var(--b3f, 250, 250, 250), 1) inset !important;
  }
`;

export default GlobalStyles;
