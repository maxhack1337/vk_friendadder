import "../../../assets/js/modulepreload-polyfill.js";
import { j as jsx, a as jsxs, b as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
const index = "";
const Popup$1 = "";

const Popup = () => {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs("div", {
      children: [
        /* Ваш текущий контент */
        /* @__PURE__ */ jsxs("header", {
          children: [
            /* @__PURE__ */ jsxs("p", {
              children: [
                /* @__PURE__ */ jsx("span", {
                  children: "Откройте страницу ",
                }),
                /* @__PURE__ */ jsx("a", {
                  target: "_blank",
                  rel: "noreferrer",
                  href: "https://vk.com/friends?act=find",
                  children: "https://vk.com/friends?act=find",
                }),
                /* @__PURE__ */ jsx("span", {
                  children: " и нажмите на кнопку расширения",
                }),
              ],
            }),
          ],
        }),
        /* Новый контент */
        /* @__PURE__ */ jsx("div", {
          style: { marginTop: "20px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom:"8px" },
          children: [
            /* @__PURE__ */ jsx("a", {
              href: "https://vk.com/vkenhancer",
              target: "_blank",
              rel: "noreferrer",
              style: { display: "flex", alignItems: "center",textDecoration: "none" },
              children: [
			  /* @__PURE__ */ jsx("span", {
                  style: { display: "flex", alignItems: "center", paddingRight: "8px" },
                  children: "powered by",
                }),
                /* @__PURE__ */ jsx("img", {
                  src: "VKEnhancerButton.png", // Замените на реальный путь к вашему изображению
                  alt: "Powered by Your Company",
                  style: { width: "80px", height: "auto", marginRight: "5px" },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};

addHmrIntoView("pages/popup");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsx(Popup, {}));
}

init();
