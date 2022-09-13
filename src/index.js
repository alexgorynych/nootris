import "./index.html";
import "./index.scss";
import Menu from "./scripts/menu";

document.addEventListener("DOMContentLoaded", () => {
    const menu = new Menu({
        header: "nav",
        button: "menu__burger",
        btnClassActive1: "menu__burger-active1",
        btnClassActive2: "menu__burger-active2",
        menu: "menu",
        menuActive: "menu-active",
        menuContainer: "menu__container",
        links: "menu__link",
    });
    menu.resize();

    document.addEventListener("resize", () => {
        menu.resize();
    });
});
