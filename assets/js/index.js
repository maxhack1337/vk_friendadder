import { r as react, j as jsx, a as jsxs, F as Fragment, b as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
const clickEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: false
});
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkVisible(elm, threshold, mode) {
  threshold = threshold || 0;
  mode = mode || "visible";
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  const above = rect.bottom - threshold < 0;
  const below = rect.top - viewHeight + threshold >= 0;
  return mode === "above" ? above : mode === "below" ? below : !above && !below;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const SideBar = ({
  show
}) => {
  const [data, setData] = react.exports.useState({});
  const [error, setError] = react.exports.useState(null);
  const [isStarted, setIsStarted] = react.exports.useState(false);
  const [done, setDone] = react.exports.useState(0);
  const helperRef = react.exports.useRef(0);
  react.exports.useEffect(() => {
    const sidebar_data_sleep = localStorage.getItem("sidebar_vk_data_sleep");
    if (sidebar_data_sleep !== null) {
      setData(JSON.parse(sidebar_data_sleep));
    } else {
      setData({
        startDelay: "3",
        stopDelay: "8",
        startDayLimit: "8500",
        stopDayLimit: "8700",
        countClick: "100"
      });
    }
    localStorage.setItem("done_users", String(1));
  }, []);
  react.exports.useEffect(() => {
    localStorage.setItem("sidebar_vk_data_sleep", JSON.stringify(data));
  }, [data]);
  react.exports.useEffect(() => {
    if (!isStarted) {
      helperRef.current = 0;
      setDone(0);
    }
  }, [isStarted]);
  const clickUsers = async () => {
    const is_started_local = Boolean(Number(localStorage.getItem("isStarted")));
    if (!is_started_local) {
      localStorage.setItem("done_users", "0");
      return "stoped";
    }
    const error_message = document.querySelector(".popup_box_container > div > div.box_body");
    if (error_message !== void 0 && error_message !== null) {
      document.querySelector("div.box_x_button").dispatchEvent(clickEvent);
      return "time_limit";
    } else {
      localStorage.setItem("done_users", String(done + 1));
      if (window.location.href === "https://vk.com/friends?act=find") {
        const users = document.querySelectorAll("div.friends_find_user.clear_fix:not(.touched)");
        if (!checkVisible(users[0], 160, "visible")) {
          users[0].scrollIntoView();
        }
        users[0].querySelector("a.friends_find_user_add").dispatchEvent(clickEvent);
        helperRef.current += 1;
        setDone(helperRef.current);
      } else {
        const users = document.querySelectorAll('#results > .search_row button.search_sub_button[style=""]');
        if (users.length === 0) {
          try {
            document.getElementById("ui_search_load_more").dispatchEvent(clickEvent);
          } catch (e) {
            console.log(e);
          }
          const a = document.querySelectorAll('button.search_sub_button[style="display: none;"]');
          a[a.length - 1].scrollIntoView();
          await sleep(getRndInteger(1 * 1e3, 2 * 1e3));
          return await clickUsers();
        }
        if (!checkVisible(users[0], 50, "visible")) {
          users[0].scrollIntoView();
        }
        users[0].dispatchEvent(clickEvent);
        helperRef.current += 1;
        setDone(helperRef.current);
      }
      return "ok";
    }
  };
  const clicking = async () => {
    let set_error = false;
    for (const item of Object.keys(data)) {
      if (isNaN(Number(data[item])) || data[item] === " " || data[item] === "") {
        if (isNaN(Number(data[item]))) {
          setError("Введите целое число");
        } else {
          setError("Все поля обязательны к заполнению");
        }
        set_error = true;
        setTimeout(() => {
          setError(null);
        }, 3e3);
        setIsStarted(false);
        localStorage.setItem("isStarted", "0");
      }
    }
    if (!window.location.href.includes("https://vk.com/friends?act=find") && !set_error) {
      setError("Перейдите, пожалуйста, по ссылке");
      setTimeout(() => {
        setError(null);
      }, 3e3);
      setIsStarted(false);
      localStorage.setItem("isStarted", "0");
    } else if (!set_error) {
      let stope = false;
      for (let i = 1; i !== Number(data.countClick) + 1; i++) {
        if (stope) {
          setIsStarted(false);
          localStorage.setItem("isStarted", "0");
          break;
        }
        const click_result = await clickUsers();
        if (click_result === "stoped") {
          stope = true;
        } else if (click_result === "time_limit") {
          console.log("Time limit");
          await sleep(getRndInteger(Number(data.startDayLimit) * 1e3, Number(data.stopDayLimit) * 1e3));
        }
        await sleep(getRndInteger(Number(data.startDelay) * 1e3, Number(data.stopDelay) * 1e3));
      }
      setIsStarted(false);
      localStorage.setItem("isStarted", "0");
    }
  };
  const startClick = async () => {
    setIsStarted(!isStarted);
    localStorage.setItem("isStarted", String(Number(!isStarted)));
    if (!isStarted) {
      clicking();
    } else {
      helperRef.current = 0;
      setDone(helperRef.current);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    style: {
      position: "absolute",
      width: "200px",
      top: "49px",
      left: "-1px",
      padding: "10px",
      opacity: Number(show),
      overflow: show ? "visible" : "hidden",
      background: "var(--vkui--color_background_modal)",
      zIndex: "1000",
      border: "1px solid var(--separator_common)",
      borderTop: "none",
      borderRadius: "0 0 var(--vkui--size_border_radius_paper--regular, 8px) var(--vkui--size_border_radius_paper--regular, 8px)",
      WebkitBoxShadow: "0 20px 40px 0 rgb(0 0 0 / 30%)",
      boxShadow: "0 20px 40px 0 rgb(0 0 0 / 30%)",
      WebkitTransition: "opacity 100ms linear,top 100ms linear,visibility 100ms linear",
      transition: "opacity 100ms linear,top 100ms linear,visibility 100ms linear",
      cursor: "default",
      pointerEvents: show ? "auto" : "none"
    },
    children: /* @__PURE__ */ jsxs("div", {
      className: "wall_module ui_scroll_container ui_scroll_default_theme",
      children: [/* @__PURE__ */ jsx("h2", {
		style: {
				marginTop: "0px",
				borderBottom: "1px solid var(--vkui--color_separator_primary)"
		},
        children: /* @__PURE__ */ jsx("div", {
          children: "Добавить друзей",
		  style: {
				lineHeight: "var(--vkui--font_text--font_size--compact)",
				color: "var(--vkui--color_text_primary)",
				fontSize: "var(--vkui--font_text--font_size--compact)",
				fontWeight: "500",
				fontSize: "13px",
				paddingBottom: "8px"
		  }
        })
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Интервал"
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between"
          },
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              style: {
                width: "50px",
				boxSizing: "border-box",
				boxShadow: "none",
				border: "1px solid rgba(0,0,0,0.2)",
				borderRadius: "5px",
				appearance: "none",
				color: "var(--vkui--color_text_primary)",
				position: "relative",
				zIndex: "var(--vkui_internal--z_index_form_field_element"
              },
              type: "text",
              placeholder: "От",
              value: data.startDelay,
              onChange: (ev) => setData({
                ...data,
                startDelay: ev.target.value
              })
            })
          }), /* @__PURE__ */ jsx("span", {
            style: {
              fontWeight: "bold"
            },
            children: "→"
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              style: {
                width: "50px",
				boxSizing: "border-box",
				boxShadow: "none",
				border: "1px solid rgba(0,0,0,0.2)",
				borderRadius: "5px",
				appearance: "none",
				color: "var(--vkui--color_text_primary)",
				position: "relative",
				zIndex: "var(--vkui_internal--z_index_form_field_element"
              },
              type: "text",
              placeholder: "До",
              value: data.stopDelay,
              onChange: (ev) => setData({
                ...data,
                stopDelay: ev.target.value
              })
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Ожидание после лимита"
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between"
          },
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              style: {
                width: "50px",
				boxSizing: "border-box",
				boxShadow: "none",
				border: "1px solid rgba(0,0,0,0.2)",
				borderRadius: "5px",
				appearance: "none",
				color: "var(--vkui--color_text_primary)",
				position: "relative",
				zIndex: "var(--vkui_internal--z_index_form_field_element"
              },
              type: "text",
              placeholder: "От",
              value: data.startDayLimit,
              onChange: (ev) => setData({
                ...data,
                startDayLimit: ev.target.value
              })
            })
          }), /* @__PURE__ */ jsx("span", {
            style: {
              fontWeight: "bold"
            },
            children: "→"
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("input", {
              style: {
                width: "50px",
				boxSizing: "border-box",
				boxShadow: "none",
				border: "1px solid rgba(0,0,0,0.2)",
				borderRadius: "5px",
				appearance: "none",
				color: "var(--vkui--color_text_primary)",
				position: "relative",
				zIndex: "var(--vkui_internal--z_index_form_field_element"
              },
              type: "text",
              placeholder: "До",
              value: data.stopDayLimit,
              onChange: (ev) => setData({
                ...data,
                stopDayLimit: ev.target.value
              })
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: "Количество добавляемых друзей"
        }), /* @__PURE__ */ jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between"
          },
          children: [/* @__PURE__ */ jsx("input", {
            style: {
                width: "50px",
				boxSizing: "border-box",
				boxShadow: "none",
				border: "1px solid rgba(0,0,0,0.2)",
				borderRadius: "5px",
				appearance: "none",
				color: "var(--vkui--color_text_primary)",
				position: "relative",
				zIndex: "var(--vkui_internal--z_index_form_field_element"
              },
            type: "text",
            value: data.countClick,
            onChange: (ev) => setData({
              ...data,
              countClick: ev.target.value
            })
          }), /* @__PURE__ */ jsxs("span", {
            children: ["Добавлено друзей: ", done]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        style: {
          marginTop: "15px",
          justifyContent: "center",
          display: "flex"
        },
        children: /* @__PURE__ */ jsx("button", {
          className: "FlatButton FlatButton--primary FlatButton--size-m",
          onClick: startClick,
          style: {
            backgroundColor: isStarted ? "var(--vkui--color_text_link)" : ""
          },
          children: isStarted ? "Стоп" : "Начать"
        })
      }), error && /* @__PURE__ */ jsx("h3", {
        style: {
          color: "var(--vkui--color_text_link)",
          textAlign: "center"
        },
        children: error !== "Перейдите, пожалуйста, по ссылке" ? error : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx("p", {
            children: error
          }), /* @__PURE__ */ jsx("a", {
            href: "https://vk.com/friends?act=find",
            children: "https://vk.com/friends?act=find",
			style: {
				textDecoration:"underline"
			}
          })]
        })
      })]
    })
  });
};
const App = () => {
  const [show, setShow] = react.exports.useState(false);

  return (
    /* @__PURE__ */ jsxs("div", {
      className: `top_notify_btn TopNavBtn ${show && "TopNavBtn--active"}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "TopNavBtn__icon", children: 
          /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24px",
            height: "24px",
            version: "1.1",
            onClick: () => setShow(!show),
            viewBox: "0 0 28 28",
            fill: "none",
            children: /* @__PURE__ */ jsxs("g", {
              children: [
                /* @__PURE__ */ jsx("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M14 13.5C17.0376 13.5 19.5 11.0376 19.5 8C19.5 4.96243 17.0376 2.5 14 2.5C10.9624 2.5 8.5 4.96243 8.5 8C8.5 11.0376 10.9624 13.5 14 13.5ZM14 11.5C15.933 11.5 17.5 9.933 17.5 8C17.5 6.067 15.933 4.5 14 4.5C12.067 4.5 10.5 6.067 10.5 8C10.5 9.933 12.067 11.5 14 11.5Z",
                  fill: "currentcolor",
                }),
                /* @__PURE__ */ jsx("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M19 26C22.3137 26 25 23.3137 25 20C25 16.6863 22.3137 14 19 14C15.6863 14 13 16.6863 13 20C13 23.3137 15.6863 26 19 26ZM20 17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17V19H16C15.4477 19 15 19.4477 15 20C15 20.5523 15.4477 21 16 21H18V23C18 23.5523 18.4477 24 19 24C19.5523 24 20 23.5523 20 23V21H22C22.5523 21 23 20.5523 23 20C23 19.4477 22.5523 19 22 19H20V17Z",
                  fill: "currentcolor",
                }),
                /* @__PURE__ */ jsx("path", {
                  d: "M11.1874 17.7386C11.7299 17.6351 12.0858 17.1114 11.9823 16.5689C11.8788 16.0264 11.3551 15.6706 10.8126 15.7741C8.0848 16.2945 6.58492 17.488 5.79183 18.6829C5.40455 19.2664 5.20687 19.8191 5.1061 20.2361C5.05572 20.4446 5.02927 20.6203 5.01537 20.7509C5.00842 20.8163 5.00458 20.8707 5.00248 20.9126C5.00143 20.9336 5.00081 20.9514 5.00045 20.966L5.00009 20.9855L5.00002 20.9933L5 20.9968L5 20.9984C5 20.9984 5 20.9999 6 20.9999H5V21.4999C5 22.8806 6.11929 23.9999 7.5 23.9999H10.5C11.0523 23.9999 11.5 23.5522 11.5 22.9999C11.5 22.4476 11.0523 21.9999 10.5 21.9999H7.5C7.22386 21.9999 7 21.7761 7 21.4999V21.0121C7.00037 21.0049 7.00144 20.988 7.00416 20.9625C7.00979 20.9095 7.02241 20.8207 7.05015 20.7059C7.10563 20.4763 7.22045 20.1471 7.45817 19.7889C7.91508 19.1005 8.9152 18.1722 11.1874 17.7386Z",
                  fill: "currentcolor",
                }),
              ],
            }),
          }),
        }),
        /* @__PURE__ */ jsx(SideBar, {
          show,
        }),
      ],
    })
  );
};


addHmrIntoView("pages/content/components/VkFriends");
const wrapper = document.querySelector(".HeaderNav__item--gap");
const root = document.createElement("div");
root.className = "HeaderNav__btns";
root.style = "cursor: pointer";
createRoot(root).render(/* @__PURE__ */ jsx(App, {}));
wrapper.parentNode.insertBefore(root, wrapper.nextElementSibling);
