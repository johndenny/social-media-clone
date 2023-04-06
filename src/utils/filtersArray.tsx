import normalJPG from "../assets/images/filters/normal.jpg";
import clarendonJPG from "../assets/images/filters/clarendon.jpg";
import ginghamJPG from "../assets/images/filters/gingham.jpg";
import moonJPG from "../assets/images/filters/moon.jpg";
import larkJPG from "../assets/images/filters/lark.jpg";
import reyesJPG from "../assets/images/filters/reyes.jpg";
import junoJPG from "../assets/images/filters/juno.jpg";
import slumberJPG from "../assets/images/filters/slumber.jpg";
import cremaJPG from "../assets/images/filters/crema.jpg";
import ludwigJPG from "../assets/images/filters/ludwig.jpg";
import adenJPG from "../assets/images/filters/aden.jpg";
import perpetuaJPG from "../assets/images/filters/perpetua.jpg";

export const filters = [
  {
    title: "normal",
    url: normalJPG,
    values: { saturation: 0, brightness: 0, contrast: 0, temperature: 100 },
  },
  {
    title: "clarendon",
    url: clarendonJPG,
    values: { saturation: 30, brightness: 30, contrast: 40, temperature: -97 },
  },

  {
    title: "gingham",
    url: ginghamJPG,
    values: {
      saturation: -10,
      brightness: 20,
      contrast: -50,
      temperature: 100,
    },
  },
  {
    title: "moon",
    url: moonJPG,
    values: { saturation: -100, brightness: 50, temperature: 100, contrast: 0 },
  },
  {
    title: "lark",
    url: larkJPG,
    values: { saturation: 15, brightness: 20, temperature: -97, contrast: 0 },
  },
  {
    title: "reyes",
    url: reyesJPG,
    values: {
      saturation: -25,
      brightness: 50,
      contrast: -100,
      temperature: 97,
    },
  },
  {
    title: "juno",
    url: junoJPG,
    values: { brightness: 20, contrast: -20, temperature: -94, saturation: 0 },
  },
  {
    title: "slumber",
    url: slumberJPG,
    values: { saturation: 25, brightness: -40, temperature: 94, contrast: 0 },
  },
  {
    title: "crema",
    url: cremaJPG,
    values: { saturation: -20, brightness: -30, temperature: -97, contrast: 0 },
  },
  {
    title: "ludwig",
    url: ludwigJPG,
    values: { saturation: 25, temperature: 97, contrast: 0, brightness: 0 },
  },
  {
    title: "aden",
    url: adenJPG,
    values: { saturation: -50, temperature: 97, contrast: 0, brightness: 0 },
  },
  {
    title: "perpetua",
    url: perpetuaJPG,
    values: { saturation: 30, brightness: -40, contrast: 0, temperature: 100 },
  },
];
